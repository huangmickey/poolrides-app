import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EmailField from "../../components/EmailField";
import PasswordField from "../../components/PasswordField";
import { AppStyles } from "../../utils/styles";

export default function RiderLogin(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/splash.png")}
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.signInText}>Sign In As Rider</Text>
        <Text style={styles.welcomeText}>Hi there! Nice to see you again.</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.textName}>Email</Text>
        <EmailField text="example@email.com" />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.textName}>Password</Text>
        <PasswordField />
      </View>

      <View style={styles.signInContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.touchables}>
        <TouchableOpacity>
          <Text style={styles.forgotBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
    alignItems: "center",
  },
  inputView: {
    backgroundColor: AppStyles.color.black,
    width: "75%",
    marginTop: 20,
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
    color: AppStyles.color.white,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppStyles.color.salmonred,
  },
  logoContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  textName: {
    fontWeight: "bold",
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.salmonred,
    marginLeft: 5,
  },
  touchables: {
    flexDirection: "row",
    paddingBottom: "30%",
  },
  registerBtn: {
    height: "50%",
    marginLeft: "30%",
  },
  forgotBtn: {
    marginBottom: 30,
    color: AppStyles.color.platinum,
    alignSelf: "flex-start",
    fontSize: 15,
  },
  signUpText: {
    fontWeight: "bold",
    fontSize: 16,
    color: AppStyles.color.salmonred,
  },
  welcomeContainer: {
    marginLeft: -45,
  },
  welcomeText: {
    color: AppStyles.color.gray,
    lineHeight: 25,
    fontWeight: "400",
    fontSize: AppStyles.fontSize.normal,
  },
  signInContainer: {
    alignItems: "stretch",
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  signInText: {
    color: AppStyles.color.gray,
    fontWeight: "bold",
    fontSize: AppStyles.textFontSizes.header,
  },
});
