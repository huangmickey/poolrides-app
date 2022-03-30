import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";

function EmailField({ text }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.textInput}
        placeholder={text}
        placeholderTextColor={colors.gray}
        onChangeText={(email) => setEmail(email)}
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
    alignItems: "flex-start",
  },

  textInput: {
    color: colors.white,
    fontSize: 15,
    flex: 1,
    padding: 10,
    marginLeft: 2,
  },
});
export default EmailField;
