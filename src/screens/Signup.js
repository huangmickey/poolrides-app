import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { AppStyles } from '../utils/styles';

export default function Signup({ navigation }) {
    function driverSignUpHandler() {
        navigation.navigate("Driver Sign up");
    }

    function riderSignUpHandler() {
        navigation.navigate("Rider Sign up");
    }

    function signInHandler() {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo} source={require("../../assets/splash.png")}
                />
                <Text style={styles.text}>Hello there, welcome to PoolRides!</Text>
            </View>

            <View style={styles.buttonBox}>
                <CustomButton title={"Driver Sign Up"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={driverSignUpHandler} />
            </View>

            <View style={styles.buttonBox}>
                <CustomButton title={"Rider Sign Up"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={riderSignUpHandler} />
            </View>


            <View style={styles.signInContainer}>
                <Text style={styles.text}>Have an Account?</Text>
                <Text onPress={() => signInHandler()} style={styles.signInButtonText}> Sign In</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    logo: {
        width: '60%',
        height: '60%',
        resizeMode: "contain",
    },
    buttonBox: {
        width: AppStyles.textInputWidth.button,
        justifyContent: 'center',
        marginBottom: '5%',
    },
    text: {
        fontSize: AppStyles.fontSize.normal,
        color: AppStyles.color.platinum,
        fontWeight: 'bold',

        textAlignVertical: "top",
        backgroundColor: AppStyles.color.black
    },
    signInContainer: {
        flexDirection: "row",
        alignItems: "stretch",
        paddingBottom: '50%',
    },
    signInButtonText: {
        textAlignVertical: "top",
        fontSize: AppStyles.fontSize.normal,
        color: AppStyles.color.salmonred,
    },
});