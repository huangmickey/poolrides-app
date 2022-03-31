import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import Logo from "../components/Logo";
import { colors } from "../utils/colors";

export default function RiderLogin(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo/>
      </View>
      <View style ={styles.welcome}>
        <Text style={styles.signInText}>Sign In As Rider</Text>
        <Text style={styles.welcomeText}>Hi there! Nice to see you again.</Text>
      </View>
  
      <View style={styles.inputView} marginTop={350}>
        <Text style={styles.textName}>Email</Text>
        <EmailField text="example@email.com" />
      </View>

      <View style={styles.inputView} marginTop={450}>
        <Text style={styles.textName}>Password</Text>
        <PasswordField />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  inputView: {
    backgroundColor: colors.black,
    width: "75%",
    position: "absolute",
    height: 50,
    margin: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.white,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 290,
    backgroundColor: colors.salmonred,
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
  textName: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.salmonred,
  },
  welcome: {
    marginLeft: -45,
},
  welcomeText: {
      marginTop: 10,
      color: colors.lightGray,
      lineHeight: 16,
      fontWeight: '400',
      fontSize: 16,
  },
  signInText: {
    marginTop: 110,
    color: colors.lightGray,
    fontWeight: 'bold',
    fontSize: 25,
  }
});
