import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AppStyles } from '../utils/styles';


function VerifyCodeField({text}){
    const[code, setCode] = useState("");

    const keyboardAppearance = 'dark';
    const maxLength = 6;
    const returnKeyType = 'Enter';

    return (
        <View style={verifyStyle.inputView}>
            <TextInput 
                style={verifyStyle.textInput}
                placeholder = {text}
                placeholderTextColor={AppStyles.color.gray}

                keyboardAppearance={keyboardAppearance}
                maxLength={maxLength}
                returnKeyType={returnKeyType}

                onChangeText={(code) => setCode(code)}
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

    textInput: {
        flex: 1,
        color: AppStyles.color.white,
        fontSize: 15,
        padding: 10,
        marginLeft: 2,
      },
});
export default VerifyCodeField;