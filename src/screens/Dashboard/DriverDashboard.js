import { StyleSheet, Text, View, SafeAreaView, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { AppStyles } from "../../utils/styles";
import { authentication, db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";
import NavOptions from "../../components/NavOptions";
import IDVerification from "../IDVerification/IDVerification";


export default function DriverDashboard() {
    const [userInfo, setUserInfo] = useState();
    const [isDriverVerified, setIsDriverVerified] = useState(null);
    useEffect(() => {
        // Update the document title using Firebase SDK
        const userUID = authentication.currentUser.uid; // Coming from auth when logged in

        const getUserData = async () => {
            const userDocReference = doc(db, "users", userUID);
            const userDocSnapshot = await getDoc(userDocReference);
            setUserInfo(userDocSnapshot.data());
            setIsDriverVerified(userDocSnapshot.data().isVerified);
        };

        getUserData();
    }, [isDriverVerified]);

    function logoutHandler() {
        console.log("User Logged Out");
        authentication.signOut();
    }

    return (
        <>
            {isDriverVerified == true ?
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={require("../../../assets/logo.png")}
                        />
                        <View style={{ justifyContent: 'center', }}>
                            <Button
                                style={styles.logOutBTN}
                                onPress={logoutHandler}
                            >Log Out</Button>
                        </View>
                    </View>

                    <View style={styles.welcomeContainer}>
                        <Text style={styles.signInText}>Hello {userInfo?.firstname}!</Text>
                        <Text style={styles.welcomeText}>What would you like to do?</Text>
                    </View>

                    <View style={styles.navContainer}>
                        <NavOptions userType={userInfo?.usertype} />
                    </View>
                </SafeAreaView>
                
                :

                isDriverVerified == false ? <SafeAreaView style={styles.container}>
                    <IDVerification driverVerification={setIsDriverVerified} />
                </SafeAreaView>             
                :
                <View style={styles.container}/>
            }

        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    text: {
        color: AppStyles.color.white,
    },
    header: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logOutBTN:{
        color: AppStyles.color.salmonred,
        fontSize: 20,
      },
    navContainer: {
        backgroundColor: AppStyles.color.black,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100,
    },
    signInText: {
        color: AppStyles.color.platinum,
        fontWeight: "bold",
        fontSize: AppStyles.textFontSizes.header,
    },
    welcomeContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 10,
    },
    welcomeText: {
        color: AppStyles.color.platinum,
        lineHeight: 25,
        fontWeight: "400",
        paddingBottom: 40,
        fontSize: AppStyles.fontSize.normal,
    },
});
