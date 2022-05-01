import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStyles } from "../../utils/styles";
import { EvilIcons, AntDesign, Fontisto } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';

export default function DriverProfile() {


    const [userInfo, setUserInfo] = useState();


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


    return (

        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../../assets/splash.png")}
            />

            <View>
                <TouchableOpacity style={styles.editField}>
                    <Text style={styles.editText}>Edit</Text>
                    <AntDesign name="edit" size={18} color='grey' />
                </TouchableOpacity>
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
        resizeMode: 'contain',
        alignSelf: "center",

    },
    editText: {
        color: AppStyles.color.gray,
        fontWeight: "normal",
        fontSize: 15,
        marginTop: 5,
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
})