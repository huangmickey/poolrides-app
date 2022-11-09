import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, } from "react-native";

import { AppStyles } from "../utils/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { authentication } from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import AuthErrorHandler from "../utils/AuthErrorHandler";

function LoginForm({ text, setSnackBarText, snackBarToggle, setIsAuthenticating }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const keyboardAppearance = "dark";
  const maxLength = 32; //Note that the Max length for Phone and Date are fix in the element not global
  const returnKeyType = "next";

  function validate() {
    Keyboard.dismiss();
    let valid = false;
    if (!inputs.email) {
      handleError("*Please input email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("*Please input valid email", "email");
      valid = false;
    }
    if (!inputs.password) {
      handleError("*Please input password", "password");
      valid = false;
    } else if (inputs.password.length == 0) {
      handleError("*Please input valid password", "password");
      valid = false;
    }else{
      valid = true;
    }
    
    
    // if (valid) {
    //   setIsAuthenticating(true);
    //   signInWithEmailAndPassword(authentication, inputs.email, inputs.password)
    //     .then((user) => {
    //       console.log(user.user.email + " => successfuly signed in ");
    //     })
    //     .catch((error) => {
    //       setSnackBarText(AuthErrorHandler(error.code));
    //       snackBarToggle();
    //       setIsAuthenticating(false);
    //     });
    // }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={styles.inputField}>
      <View>
        <Text style={styles.textName} marginTop={10}>
          Email
        </Text>
        <View style={styles.inputView} marginBottom={10}>
          <TextInput
            style={styles.textInput}
            // placeholder={text}
            placeholder={'example@email.com'}
            placeholderTextColor={AppStyles.color.gray}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => {
              handleError(null, "email");
            }}
          />
          <View>
            <Text style={styles.errorMsg}>{errors.email}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.textName}>Password</Text>
        <View style={styles.inputView}>
          <TouchableOpacity
            style={styles.hideIcon}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <Icon
              name={hidePassword === true ? "eye-off-outline" : "eye-outline"}
              style={{ color: AppStyles.color.white, fontSize: 20 }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder={"Password"}
            placeholderTextColor={AppStyles.color.gray}
            secureTextEntry={hidePassword}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onChangeText={(text) => handleOnChange(text, "password")}
            onFocus={() => {
              handleError(null, "password");
            }}
          />
          <View>
            <Text style={styles.errorMsg}>{errors.password}</Text>
          </View>
        </View>
      </View>
  
      <View style={styles.signInContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.loginBtn}
          onPress={validate}
        >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
    color: AppStyles.color.white,
  },
  hideIcon: {
    position: "absolute",
    right: 5,
    top: 12,
    zIndex: 999,
  },
  inputView: {
    backgroundColor: AppStyles.color.black,
    borderBottomColor: AppStyles.color.white,
    borderBottomWidth: 2,
    width: "100%",
    height: 45,
    alignItems: "flex-start",
  },
  textInput: {
    flex: 1,
    color: AppStyles.color.white,
    fontSize: 15,
    padding: 10,
    marginLeft: 2,
    alignSelf: 'stretch',
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
  textName: {
    fontWeight: "bold",
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.salmonred,
    marginLeft: 5,
    marginTop: "3%",
  },
  signInContainer: {
    alignItems: "stretch",
    paddingTop: "15%",
  },
  inputField: {
    backgroundColor: AppStyles.color.black,
    width: "75%",
    marginTop: "5%",
  },
  errorMsg: {
    color: "red",
    position: "absolute",
    top: 4,
  },
});
export default LoginForm;
