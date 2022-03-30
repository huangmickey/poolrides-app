import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";

function PasswordField() {
  const [password, setPassword] = useState("");

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        textAlign={"center"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: colors.black,
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    width: "100%",
    height: 45,
    alignItems: "baseline",
  },

  textInput: {
    color: colors.white,
    fontSize: 15,
    marginLeft: 2,
    flex: 1,
    padding: 10,
  },
});
export default PasswordField;
