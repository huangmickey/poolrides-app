import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useState, useEffect } from "react";
import { AppStyles } from "../../utils/styles";
import CustomButton from "../../components/CustomButton";
import { authentication, db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";
import NavOptions from "../../components/NavOptions";

export default function DriverDashboard({ navigation }) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // Update the document title using Firebase SDK
    const userUID = authentication.currentUser.uid; // Coming from auth when logged in

    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
      console.log(userInfo?.firstname);
    };

    getUserData();
  }, []);

  function logoutHandler() {
    console.log("User Logged Out");
    authentication.signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{
            width: 160,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../../assets/splash.png")}
        />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.signInText}>Hello {userInfo?.firstname}!</Text>
        <Text style={styles.welcomeText}>What would you like to do?</Text>
      </View>
      <View style={styles.navContainer}>
        <NavOptions />
      </View>

      <CustomButton
        title="Log out"
        color={AppStyles.color.mint}
        textColor={AppStyles.color.white}
        onPress={logoutHandler}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  text: {
    color: AppStyles.color.white,
  },
  logo: {
    padding: 10,
    paddingTop: 10,
  },
  navContainer: {
    backgroundColor: AppStyles.color.black,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  signInText: {
    color: AppStyles.color.gray,
    fontWeight: "bold",
    fontSize: AppStyles.textFontSizes.header,
  },
  welcomeContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  welcomeText: {
    color: AppStyles.color.gray,
    lineHeight: 25,
    fontWeight: "400",
    paddingBottom: 40,
    fontSize: AppStyles.fontSize.normal,
  },
});
