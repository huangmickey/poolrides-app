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
    TextInput
} from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStyles } from "../../utils/styles";
import { EvilIcons, AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';
import { firebase } from '@react-native-firebase/storage';
import {getAuth, updatePassword, reauthenticateWithCredential} from "firebase/auth"

export default function DriverProfile() {
 
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

    // const reauthenticate = (currentPassword) =>{
    //     const auth = getAuth();
    //     const user = auth.currentUser;
    //     const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    //     return reauthenticateWithCredential(user, cred);
    // }
    const changePassword = () => {
        if(newPassword == 0 || confirmPassword == 0){
            Alert.alert("Please enter password");
        }
        else if(newPassword === confirmPassword){
            // reauthenticate(currentPassword).then(()=> {
            const auth = getAuth();
            const user = auth.currentUser;
            updatePassword(user, newPassword).then(() =>{
                Alert.alert("Password has been successfully changed");
            }).catch((error) => {
                Alert.alert(error.message);
            });
        // }).catch((error) => {
        //     Alert.alert(error.message);
        // })
        }else{
            Alert.alert("New and confirmed passwords do not match");
        }   
    }
    function openPasswordChange(){
        setModalOpen(false);
        setPasswordModalOpen(true);
    }
    function openEmailChange(){
        setModalOpen(false);
        setEmailModalOpen(true);
    }
    function openPhoneChange(){
        setModalOpen(false);
        setPhoneModalOpen(true);
    }
    function openInterestsChange(){
        setModalOpen(false);
        setInterestsModalOpen(true);
    }
    function openUploadModal(){
        setModalOpen(false);
        setUploadModalOpen(true);
    }

    return (

        <SafeAreaView style={styles.container}>
            <Modal visible={modalOpen}
                    animationType="slide"
                    transparent={false}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <MaterialIcons style={styles.closeBtn}
                                name='close'
                                size={24}
                                onPress={() => setModalOpen(false)}
                            ></MaterialIcons>
                            <TouchableOpacity onPress={openPasswordChange} style={{borderTopWidth: 1, borderTopColor: "white", borderBottomWidth: 1, borderBottomColor: "white", padding: 20, width: '100%', marginTop: 30}}>
                                <Text style={{color: "white", textAlign:'center'}}>Change Password</Text> 
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={openEmailChange} style={styles.modalField}>
                                <Text style={{ color: "white", textAlign: "center"}}>Edit Email</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity onPress={openPhoneChange} style={styles.modalField}>
                                <Text style={{ color: "white", textAlign: "center"}}>Edit Phone Number</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={openInterestsChange} style={styles.modalField}>
                                <Text style={{ color: "white", textAlign: "center"}}>Edit Interests</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={openUploadModal} style={styles.modalField}>
                                <Text style={{ color: "white", textAlign: "center"}}>Upload Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>

            <Modal visible={passwordModalOpen}
                animationType="none"
                transparent={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MaterialIcons style={styles.closeBtn}
                            name='close'
                            size={24}
                            onPress={() => setPasswordModalOpen(false)}
                        ></MaterialIcons>
                            <FloatingLabelInput
                                value={newPassword}
                                label={'New password:'}
                                onChangeText={setNewPassword}
                                secureTextEntry={true}
                            />
                             <FloatingLabelInput
                                value={confirmPassword}
                                label={'Confirm new password:'}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={true}
                            />
                            <FloatingLabelInput
                                value={currentPassword}
                                label={'Current password:'}
                                onChangeText={setCurrentPassword}
                                secureTextEntry={true}
                            />
                            <Button styles = {{paddingTop: 20}}
                                title='Submit'
                                color={AppStyles.color.salmonred}
                                onPress={changePassword}
                            >
                            </Button>        
                    </View>
                </View>
            </Modal>

            <Modal visible={emailModalOpen}
                animationType="none"
                transparent={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MaterialIcons style={styles.closeBtn}
                            name='close'
                            size={24}
                            onPress={() => setEmailModalOpen(false)}
                        ></MaterialIcons>
                            <FloatingLabelInput
                                value={newEmail}
                                label={'New email:'}
                                onChangeText={setNewEmail}
                            />
                            <FloatingLabelInput
                                value={currentPassword}
                                secureTextEntry={true}
                                label={'Current password:'}
                                // onChangeText={}
                            />
                            <Button styles = {{paddingTop: 20}}
                                title='Submit'
                                color={AppStyles.color.salmonred}
                                onPress={()=>{}}
                            >
                            </Button>        
                    </View>
                </View>
            </Modal>

            <Modal visible={phoneModalOpen}
                animationType="none"
                transparent={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MaterialIcons style={styles.closeBtn}
                            name='close'
                            size={24}
                            onPress={() => setPhoneModalOpen(false)}
                        ></MaterialIcons>
                            <FloatingLabelInput
                                value={newPhone}
                                label={'New phone number:'}
                                onChangeText={setNewPhone}
                            />
                            <FloatingLabelInput
                                value={currentPassword}
                                label={'Current password:'}
                                // onChangeText={}
                            />
                            <Button styles = {{paddingTop: 20}}
                                title='Submit'
                                color={AppStyles.color.salmonred}
                                onPress={()=>{}}
                            >
                            </Button>        
                    </View>
                </View>
            </Modal>

            <Modal visible={interestsModalOpen}
                animationType="none"
                transparent={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MaterialIcons style={styles.closeBtn}
                            name='close'
                            size={24}
                            onPress={() => setInterestsModalOpen(false)}
                        ></MaterialIcons>
                            <Button styles = {{paddingTop: 20}}
                                title='Add interests'
                                color={AppStyles.color.salmonred}
                                onPress={()=>{}}
                            >
                            </Button>        
                    </View>
                </View>
            </Modal>

            <Modal visible={uploadModalOpen}
                animationType="none"
                transparent={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MaterialIcons style={styles.closeBtn}
                            name='close'
                            size={24}
                            onPress={() => setUploadModalOpen(false)}
                        ></MaterialIcons>
                            <Button styles = {{paddingTop: 20}}
                                title='Upload picture'
                                color={AppStyles.color.salmonred}
                                onPress={()=>{}}
                            >
                            </Button>        
                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require("../../../assets/splash.png")}
                />
                <View style={{ justifyContent: 'center', }}>
                    <Button
                        title='Edit'
                        color={AppStyles.color.salmonred}
                        onPress={()=> setModalOpen(true)}
                    >
                    </Button>
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
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: '4%',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        borderColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.small,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        // alignSelf: "center",
    },
    editText: {
        color: AppStyles.color.gray,
        fontWeight: "normal",
        fontSize: 15,
        // marginTop: 5,
        letterSpacing: 1,
        paddingBottom: 5,
        paddingLeft: 20,
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
    button: {
        alignItems: "center",
        backgroundColor: AppStyles.color.mint,
        padding: 10,
        borderRadius: 30,
        height: 50,
        width: 200,
        alignSelf: 'center',
        marginTop: 10,
    },
    header: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        margin: 20,
        width: "85%",
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
    },
    closeBtn: {
        alignSelf:'flex-end', 
        color: "white"
    },
    modalField: {
        borderBottomWidth: 1,
         borderBottomColor: "white", 
         padding: 20, width: '100%', 
         marginBottom: 10
    }

})