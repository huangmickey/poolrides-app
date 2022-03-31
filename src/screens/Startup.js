import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { AppStyles } from '../utils/styles';

export default function Startup({ navigation }) {
    function driverLoginPressHandler() {
        navigation.navigate("Driver Login");
    }

    function riderLoginPressHandler() {
        navigation.navigate("Rider Login");
    }

    function signUpPressHandler() {
        navigation.navigate("Sign up");
    }

    return (

        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image
              style={styles.logo} source={require("../../assets/splash.png")}
            />
            </View>
                                          
            <View style={styles.buttonBox}>
                <CustomButton title={"Driver Login"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={driverLoginPressHandler}/>
            </View>
            
            <View style={styles.buttonBox}>
                <CustomButton title={"Rider Login"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={riderLoginPressHandler}/>  
            </View>

            <View style={styles.signUpContainer}>
            < Text style={styles.text}>New to PoolRides?</Text>
                <Pressable onPress={signUpPressHandler}>
                    <Text style={styles.signUpButtonText}> Sign Up
                    </Text>
                </Pressable>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
        alignItems : 'center',
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
        color: "white",
        textAlignVertical: "top",
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