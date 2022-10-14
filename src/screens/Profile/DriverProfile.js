import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Button,
    Alert,
} from 'react-native';
import CustomButton from "../../components/CustomButton";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStyles } from "../../utils/styles";
import { EvilIcons, AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';


export default function DriverProfile({ navigation }) {

    const [userInfo, setUserInfo] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordModalOpen, setPasswordModalOpen] = useState('false');
    const [emailModalOpen, setEmailModalOpen] = useState('false');
    const [phoneModalOpen, setPhoneModalOpen] = useState('false');
    const [interestsModalOpen, setInterestsModalOpen] = useState('false');
    const [uploadModalOpen, setUploadModalOpen] = useState('false');
    const [deleteModalOpen, setDeleteModalOpen] = useState('false');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');


    useEffect(() => {
        const userUID = authentication.currentUser.uid;

        const getUserData = async () => {
            const userDocReference = doc(db, "users", userUID);
            const userDocSnapshot = await getDoc(userDocReference);
            setUserInfo(userDocSnapshot.data());
            console.log(userInfo);
        }
        getUserData();

    }, []);

    function editProfileHandler() {

        navigation.navigate("Account Settings");
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require("../../../assets/splash.png")}
                />
                <View style={{ justifyContent: 'center', }}>
                    <TouchableOpacity
                        onPress={editProfileHandler}
                    >
                        <View>
                            <Text style={styles.editText}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.topField}>

                <TouchableOpacity>
                    <View style={styles.photo}>
                        <EvilIcons style={{ marginLeft: -23, marginTop: -8 }} name="user" size={140} color="white" />
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                    <Text style={styles.userNameText}>{userInfo?.firstname}  {userInfo?.lastname}</Text>
                </View>

            </View>

            <View>
                <View style={styles.emailField}>
                    <Fontisto style={{ paddingVertical: 4, paddingRight: 7 }} name="email" size={15} color="white" />
                    <Text style={styles.emailText}>{userInfo?.email}</Text>
                </View>
                <View style={styles.phoneField}>
                    <AntDesign style={{ paddingVertical: 4, paddingRight: 7 }} name="phone" size={17} color="white" />
                    <Text style={styles.phoneText}>{userInfo?.phone}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    logo: {
        width: 100,
        height: 50,
    },
    editText: {
        color: AppStyles.color.salmonred, 
        paddingRight: 10, 
        fontSize: 18 
    },
    userNameText: {
        color: '#FFF',
        fontSize: 18,
        paddingLeft: 30,
        fontWeight: 'bold',
    },
    emailText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'normal',
        paddingBottom: 8,
        textAlign: 'left',
        alignItems: "center",
    },
    phoneText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'normal',
        paddingBottom: 8,
        textAlign: 'left',
    },
    editField: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: -100,
    },
    emailField: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingBottom: 20,
    },
    phoneField: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderColor: AppStyles.color.gray,
        borderRadius: 50,
        borderWidth: 3,
        marginLeft: 20,
    },
    topField: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        paddingTop: 10,
    },
    header: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})