import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginForm from "../components/LoginForm";
import { AppStyles } from "../utils/styles";
import LoadingOverlay from "../components/LoadingOverlay";
import { Snackbar } from "react-native-paper";

export default function RiderLogin({navigation}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [snackBarVisisble, setSnackBarVisible] = useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisisble);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const [snackBarText, setSnackBarText] = useState("");

  function signUpPressHandler() {
    navigation.navigate("Sign up");
  }
  function forgotPwordPressHandler(){
    navigation.navigate("Recover");
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..."  />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollviewContainer} 
      enableOnAndroid={true} extraScrollHeight={20}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.signInText}>Sign in to your account</Text>
        <Text style={styles.welcomeText}>Hi there! Nice to see you again.</Text>
      </View>
      <View style={styles.formContainer}>
        <LoginForm text="example@email.com" setIsAuthenticating={setIsAuthenticating} setSnackBarText={setSnackBarText} snackBarToggle={onToggleSnackBar}/>
      </View>

      <View style={styles.touchables}>
        <Text style={styles.forgotBtn} onPress = {forgotPwordPressHandler}>Forgot Password?</Text>
        <Text style={styles.signUpText} onPress={signUpPressHandler}>Sign Up</Text>
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
            duration={3500}
            onDismiss={onDismissSnackBar}
            action={{
                label: '',
                onPress: () => {
                    onDismissSnackBar();
                },
            }}>
            {snackBarText}
          </Snackbar>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  scrollviewContainer: {
      flexGrow: 1,
      alignItems: 'center',
  },
  logoContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: 'center',
    marginTop: "15%",
    marginBottom: "3%",
     height: "15%",
  },
  logo: {
    width: "60%",
    height: "100%",
    resizeMode: "contain",
  },
  welcomeContainer: {
    marginLeft: -45,
  },
  signInText: {
    color: AppStyles.color.platinum,
    fontWeight: "bold",
    fontSize: AppStyles.textFontSizes.header,
  },
  welcomeText: {
    color: AppStyles.color.platinum,
    lineHeight: 25,
    fontWeight: "400",
    fontSize: AppStyles.fontSize.normal,
  },
  formContainer: {
    paddingBottom: "3%",
  },
  touchables: {
    flexDirection: "row",
  },
  forgotBtn: {
    marginBottom: "10%",
    color: AppStyles.color.platinum,
    alignSelf: "flex-start",
    fontSize: 15,
  },
  signUpText: {
    fontWeight: "bold",
    fontSize: 16,
    color: AppStyles.color.salmonred,
    marginLeft: "30%",
  },
  snackBarContainer: {
    flex: 1,
    // justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.gray,
  },
});