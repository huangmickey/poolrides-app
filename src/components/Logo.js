import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../utils/colors";


export default function Logo() {
    return (
        <View style ={styles.logoContainer}>
            <Image
                style={styles.logo}
                source={require("../../assets/splash.png")}
            />
            <Text style={styles.text}>PoolRides</Text>
        </View>
    );
  }

  const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
    },
    logo: {
        width: 153,
        height: 58,
        resizeMode: "contain",
        position: "absolute",
    },
    text: {
        color: '#abb5be',
        position: "relative",
        top: 60,
        fontSize: 17,
        fontWeight: "600",
      },
      
  });