import { StyleSheet, TextInput, View, } from "react-native";
import React, { useState } from "react";
import { AppStyles } from "../utils/styles";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function PasswordField() {
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const keyboardAppearance = "dark";
  const maxLength = 16; //Note that the Max length for Phone and Date are fix in the element not global
  const returnKeyType = "next";

  return (
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
  hideIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});
export default PasswordField;
