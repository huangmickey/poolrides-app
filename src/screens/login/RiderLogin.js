import React, { useState, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginForm from "../../components/LoginForm";
import { AppStyles } from "../../utils/styles";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Snackbar } from "react-native-paper";

import { login } from "../../services/auth";
import { AuthContext } from "../../services/auth-context";

export default function RiderLogin(props, { navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const email = "user@gmail.com";
  const password = "password";

  const [snackBarVisisble, setSnackBarVisible] = useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisisble);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const [snackBarText, setSnackBarText] = useState("");

  const authCtx = useContext(AuthContext);

  function signUpPressHandler() {
    props.navigation.navigate("Sign up");
  }
  async function loginHandler() {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      switch (errorMessage) {
        case "INVALID_PASSWORD":
          setSnackBarText("Login credentials invalid");
          onToggleSnackBar();
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
          setSnackBarText("Too many attempts, try later or reset password");
          onToggleSnackBar();
          break;
        default:
      }
      console.log(errorMessage);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

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
      <View style={styles.formContainer}>
        <LoginForm text="example@email.com" />
      </View>

      <View style={styles.touchables}>
        <TouchableOpacity>
          <Text style={styles.forgotBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.signUpText} onPress={signUpPressHandler}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.snackBarContainer}>
        <Snackbar
          theme={{
            colors: {
              onSurface: AppStyles.color.gray,
              surface: AppStyles.color.white,
              accent: AppStyles.color.salmonred,
            },
          }}
          visible={snackBarVisisble}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Dismiss",
            onPress: () => {
              onDismissSnackBar();
            },
          }}
        >
          {snackBarText}
        </Snackbar>
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
  formContainer: {
    paddingBottom: "3%",
  },
  logoContainer: {
    flex: 1,
    flexGrow: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: "15%",
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
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
  signInText: {
    color: AppStyles.color.gray,
    fontWeight: "bold",
    fontSize: AppStyles.textFontSizes.header,
  },
  snackBarContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.gray,
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
