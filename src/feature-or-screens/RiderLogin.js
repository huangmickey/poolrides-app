import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import { colors } from "../utils/colors";

export default function RiderLogin(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/splash.png")}
        />
        <Text style={styles.text}>PoolRides</Text>
      </View>

      <View style={styles.label} marginTop={200}>
        <Text style={styles.textName}>Email</Text>
      </View>
      <View style={styles.inputView} marginTop={380}>
        <EmailField text="example@email.com" />
      </View>

      <View style={styles.label} marginTop={70}>
        <Text style={styles.textName}>Password</Text>
      </View>
      <View style={styles.inputView} marginTop={470}>
        <PasswordField />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  inputView: {
    backgroundColor: colors.black,
    width: "75%",
    position: "absolute",
    height: 50,
    margin: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: -100,
  },
  logo: {
    width: 153,
    height: 58,
    resizeMode: "contain",
    position: "absolute",
  },
  text: {
    color: "#abb5be",
    position: "relative",
    top: 60,
    fontSize: 16,
    fontWeight: "600",
    // fontFamily: 'Asap',
  },
  textName: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.salmonred,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 140,
  },
});
