import { StyleSheet, Text, View, SafeAreaView, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { AppStyles } from "../../utils/styles";
import { authentication, db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";
import NavOptions from "../../components/NavOptions";
import IDVerification from "../IDVerification/IDVerification";


export default function DriverDashboard() {
    const [userInfo, setUserInfo] = useState();
    const [isDriverVerified, setIsDriverVerified] = useState();
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

            {isDriverVerified ?
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={require("../../../assets/splash.png")}
                        />
                        <View style={{ justifyContent: 'center', }}>
                            <Button
                                title='Log out'
                                color={AppStyles.color.salmonred}
                                onPress={logoutHandler}
                            >
                            </Button>
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

                <SafeAreaView style={styles.container}>
                    <IDVerification driverVerification={setIsDriverVerified} />
                </SafeAreaView>


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
    navContainer: {
        backgroundColor: AppStyles.color.black,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100,
    },
    signInText: {
        color: AppStyles.color.gray,
        fontWeight: "bold",
        fontSize: AppStyles.textFontSizes.header,
    },
    welcomeContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 10,
    },
    welcomeText: {
        color: AppStyles.color.gray,
        lineHeight: 25,
        fontWeight: "400",
        paddingBottom: 40,
        fontSize: AppStyles.fontSize.normal,
    },
});
