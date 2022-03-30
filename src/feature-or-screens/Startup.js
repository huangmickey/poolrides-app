import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
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
            <Image
              style={styles.logo} source={require("../../assets/splash.png")}
            />
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.buttonBox}>
                    <CustomButton title={"Driver Login"} color={colors.mint} textColor={colors.black} onPress={driverLoginPressHandler}/>
                </View>
                <View style={styles.buttonBox2}>
                    <CustomButton title={"Rider Login"} color={colors.mint} textColor={colors.black} onPress={riderLoginPressHandler}/>
                    
                </View>
                <View>
          
                  <Button title="New to PoolRides? Sign Up." color={'white'} onPress={signUpPressHandler}/>
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
    logo: {
      width: 153,
      height: 58,
      resizeMode: "contain",
      position: "absolute",
    },
    textSignUp: {
        color: "white",
        textDecorationLine: "underline", 
        marginTop: "5%"
    }
});

