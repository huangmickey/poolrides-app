import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { AppStyles } from "../utils/styles";


function LoginForm({ text }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const keyboardAppearance = 'dark';
    const maxLength = 16;           //Note that the Max length for Phone and Date are fix in the element not global
    const returnKeyType= 'next';

  return (
    <View style={styles.inputField}>
      <View>
        <Text style={styles.textName}>Email</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder={text}
            placeholderTextColor={AppStyles.color.gray}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
      </View>
      <View>
        <Text style={styles.textName}>Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder={"Password"}
            placeholderTextColor={AppStyles.color.gray}
            secureTextEntry={true}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onChangeText={(password) => setPassword(password)}
            textAlign={"center"}
          />
        </View>
      </View>

      <View style={styles.signInContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        fontWeight: "bold",
        fontSize: 16,
        color: AppStyles.color.white,
    },
    inputView: {
        backgroundColor: AppStyles.color.black,
        borderBottomColor: AppStyles.color.white,
        borderBottomWidth: 2,
        width: "100%",
        height: 45,
        alignItems: "flex-start",
        marginBottom: 20,  
      },
      textInput: {
        flex: 1,
        color: AppStyles.color.white,
        fontSize: 15,
        padding: 10,
        marginLeft: 2,
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
      },
      btnContainer: {
        position: "relative",
        alignItems: "stretch",
        paddingTop: "10%",
        paddingBottom: "5%",
      },
      inputField: {
        backgroundColor: AppStyles.color.black,
         width: "75%",
        marginTop: 20,
      }
});
export default LoginForm;
