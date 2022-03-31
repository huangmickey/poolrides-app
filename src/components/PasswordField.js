import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AppStyles } from '../utils/styles';

function PasswordField() {
  const [password, setPassword] = useState("");

  const keyboardAppearance = 'dark';
  const maxLength = 16;           //Note that the Max length for Phone and Date are fix in the element not global
  const returnKeyType= 'next';

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={AppStyles.color.gray}
        secureTextEntry={true}
        
        keyboardAppearance={keyboardAppearance}
        maxLength={maxLength}
        returnKeyType={returnKeyType}

        onChangeText={(password) => setPassword(password)}
        textAlign={"center"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
export default PasswordField;
