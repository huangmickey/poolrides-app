import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AppStyles } from '../utils/styles';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import CustomButton from "./CustomButton";



function EnterEmailforPwordReset({text}){
    const[email, setCode] = useState("");
    const auth = getAuth();
    const keyboardAppearance = 'dark';
    const returnKeyType = 'Enter';
    const maxLength = 60;

    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      console.log('Password reset email sent!');
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });

    

    return (
        <View style={verifyStyle.inputView}>
            <TextInput 
                style={verifyStyle.textInput}
                placeholder = {text}
                placeholderTextColor={AppStyles.color.gray}

                keyboardAppearance={keyboardAppearance}
                maxLength={maxLength}
                returnKeyType={returnKeyType}

                onChangeText={(email) => setCode(email)}
            />

            
        </View>
    );
}

const verifyStyle = StyleSheet.create({
    inputView:{
        backgroundColor: AppStyles.color.black,
        borderBottomColor: AppStyles.color.white,
        borderBottomWidth: 2,
        width: "100%",
        height: 45,
        alignItems: "flex-start",
    },
    buttonBox: {
        width: AppStyles.textInputWidth.button,
        justifyContent: 'center',
        marginBottom: '25%',
    },
    textInput: {
        flex: 1,
        color: AppStyles.color.white,
        fontSize: 15,
        padding: 10,
        marginLeft: 2,
      },
});
export default EnterEmailforPwordReset;