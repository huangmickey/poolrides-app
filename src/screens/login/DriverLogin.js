import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { AppStyles } from "../../utils/styles";

export default function DriverLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/splash.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
});
