import React, { useState, useEffect } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from 'react-native-button';
import { useDispatch, useSelector } from "react-redux";

import NavOptions from "../../components/NavOptions";
import IDVerification from "../IDVerification/IDVerification";

import { setDriverName, selectLocationPermissionStatus } from "../../../slices/navSlice";
import { getLocationPermission } from "../../utils/gpsUtils";
import { AppStyles } from "../../utils/styles";

import { authentication, db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 

export default function DriverDashboard() {
    const [userInfo, setUserInfo] = useState();
    const [isDriverVerified, setIsDriverVerified] = useState(null);
    const dispatch = useDispatch()
    const locationPermissionStatus = useSelector(selectLocationPermissionStatus)
    const { askForLocationPermission, getGPSLocation } = getLocationPermission();

    // initla useEffect to get Driver Information and verify that the Driver is verified
    useEffect(() => {
        // Update the document title using Firebase SDK
        const userUID = authentication.currentUser.uid; // Coming from auth when logged in

        const getUserData = async () => {
            const userDocReference = doc(db, "users", userUID);
            const userDocSnapshot = await getDoc(userDocReference);
            setUserInfo(userDocSnapshot.data());
            setIsDriverVerified(userDocSnapshot.data().isVerified);
            const driverFullName = userInfo?.firstname + " " + userInfo?.lastname
            dispatch(
                setDriverName({
                    driverName: driverFullName
                }))
        };

        getUserData();
    }, [isDriverVerified]);

    // initial useEffect to call askForLocationPermission Hook
    useEffect(() => {
        askForLocationPermission()
    }, []);

    // useEffect to call getGPSLocation() Hook after askForLocationPermission() Hook
    useEffect(() => {
        if (locationPermissionStatus?.locationPermissionStatus.granted === true) {
            getGPSLocation()
        }
    }, [locationPermissionStatus])

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
                            style={styles.logo}
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
                    <View style={styles.container} />
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    header: {
        marginTop: height * 0.05,
        height: height * 0.07,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        height: '100%',
        width: "35%",
        resizeMode: "contain",
    },
    logOutBTN: {
        color: AppStyles.color.salmonred,
        fontSize: 24,
    },
    welcomeContainer: {
        padding: 10,
        paddingTop: 20,
    },
    signInText: {
        color: AppStyles.color.platinum,
        fontWeight: "bold",
        fontSize: AppStyles.textFontSizes.header,
    },
    welcomeText: {
        color: AppStyles.color.platinum,
        lineHeight: 25,
        paddingBottom: "7%",
        fontSize: AppStyles.fontSize.normal,
    },
    navContainer: {  
        position: "absolute",
        alignSelf: "center",
        marginTop: height * 0.33,
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1,
      },
});