import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LoginForm from "../../components/LoginForm";
import { AppStyles } from "../../utils/styles";


export default function DriverLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/splash.png")}
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.signInText}>Sign In As Driver</Text>
        <Text style={styles.welcomeText}>Hi there! Nice to see you again.</Text>
      </View>
        <View style ={styles.formContainer}>
          <LoginForm text="example@email.com"/>
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
  signInText: {
    color: AppStyles.color.gray,
    fontWeight: "bold",
    fontSize: AppStyles.textFontSizes.header,
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
});
