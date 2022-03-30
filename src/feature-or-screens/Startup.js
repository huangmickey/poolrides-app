import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { colors } from "../utils/colors";


export default function Startup({ navigation }) {
    function driverLoginPressHandler() {
        navigation.navigate("Driver Login");
    }

    function riderLoginPressHandler() {
        navigation.navigate("Rider Login");
    }

    function signUpPressHandler() {
        navigation.navigate("Sign Up");
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.text}>Pool Rides Logo</Text>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.buttonBox}>
                    <CustomButton title={"Driver Login"} color={colors.mint} textColor={colors.black} onPress={driverLoginPressHandler}/>
                </View>
                <View style={styles.buttonBox2}>
                    <CustomButton title={"Rider Login"} color={colors.mint} textColor={colors.black} onPress={riderLoginPressHandler}/>
                    <Text style={styles.textSignUp}>Sign up text button</Text>
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
        marginTop: '15%'
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
        width: '50%',
        justifyContent: 'center',
        flexGrow: 1,
        marginTop: '5%' 
    },
    buttonBox2: {
        flex: 1,
        width: '50%',
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