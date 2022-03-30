import React from "react";
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