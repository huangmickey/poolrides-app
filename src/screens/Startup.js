import React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import CustomButton from "../components/CustomButton";
import { AppStyles } from '../utils/styles';

export default function Startup({ navigation }) {
    function loginPressHandler() {
        navigation.navigate("Login");
    }

    function signUpPressHandler() {
        navigation.navigate("Sign up");
    }

    function forgotCredentialsHandler() {
        navigation.navigate("Recover");
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo} source={require("../../assets/logo.png")}
                />
            </View>

            <View style={styles.buttonBox}>
                <CustomButton stretch={true} title={"Login"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={loginPressHandler} />
            </View>

            <View style={styles.buttonBox}>
                <CustomButton stretch={true} title={"Sign Up"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={signUpPressHandler} />
            </View>

            <View style={styles.signUpContainer}>
                <Text style={styles.text}>Forgot account?</Text>
                <Text onPress={forgotCredentialsHandler} style={styles.signUpButtonText}> Recover</Text>
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
        marginTop: '15%',
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
        textAlignVertical: "top",
        fontWeight: 'bold'
    },
    signUpContainer: {
        flexDirection: "row",
        alignItems: "stretch",
        paddingBottom: '50%',
    },
    signUpButtonText: {
        textAlignVertical: "top",
        fontSize: AppStyles.fontSize.normal,
        color: AppStyles.color.salmonred,
    },
});