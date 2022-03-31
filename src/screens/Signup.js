import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { CustomText } from "../components/CustomText";
import { colors } from "../utils/colors";


export default function Signup({ navigation }) {
    function driverSignUpHandler() {
        navigation.navigate("Driver Sign up");
    }

    function riderSignUpHandler() {
        navigation.navigate("Rider Sign up");
    }

    function signInHandler() {
        
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.text}>Hello, welcome to PoolRides!</Text>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.buttonBox}>
                    <CustomButton title={"Driver Signup"} color={colors.mint} textColor={colors.black} onPress={driverSignUpHandler}/>
                </View>
                <View style={styles.buttonBox2}>
                    <CustomButton title={"Rider Signup"} color={colors.mint} textColor={colors.black} onPress={riderSignUpHandler}/>
                    <Text style={styles.textSignUp}>Have an Account? Sign in</Text>
                </View>
                <View style={styles.buttonBox}>
                    
                </View>
            </View>
            <View style={styles.sectionContainer}>
                
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.black
    },
    logoContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexGrow: 1,
    },
    buttonBox: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
        flexGrow: 1,
    },
    buttonBox2: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
        flexGrow: 1,
    },
    text: {
        color: "white",
    },
    textSignUp: {
        color: "white",
        marginTop: "5%"
    }
});