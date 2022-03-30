import React from "react";
<<<<<<< HEAD
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { colors } from "../utils/colors";
import { textDecorationLine } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function Startup() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/splash.png")}
        />
        <Text style={styles.text}>PoolRides</Text>
      </View>
      <View style={styles.signUp}>
          <TouchableOpacity
            onPress = {() => naviagation.navigate()}
            >
                <Text style ={styles.signUpStyle}>New to PoolRides? Sign Up.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      alignItems: "center",
    },
    logo: {
      width: 153,
      height: 58,
      resizeMode: "contain",
      position: "absolute",
    },
    text: {
      color: "#abb5be",
      position: "relative",
      top: 60,
      fontSize: 16,
      fontWeight: "600",
    },
    logoContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 140,
    },
    signUpStyle:{
        color: "white",
        position: "absolute",
        textDecorationLine: "underline", 
        top: 600,
        left: -90
    }


  });
=======
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
>>>>>>> origin/main
