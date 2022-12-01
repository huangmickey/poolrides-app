import React, { useState, useEffect } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Keyboard } from 'react-native'
import { AppStyles } from "../../utils/styles";
import { authentication, db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";
import NavOptions from "../../components/NavOptions";
import { useNavigation } from "@react-navigation/native";
import FromAddressSearchBar from "../../components/FromAddressSearch";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);
import { useDispatch } from "react-redux";
import { setRiderName } from "../../../slices/navSlice";

export default function RiderDashboard() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    // Update the document title using Firebase SDK
    const userUID = authentication.currentUser.uid; // Coming from auth when logged in

    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      const data = userDocSnapshot.data()
      setUserInfo(data);
      dispatch(
        setRiderName({
          riderName: data.firstname + " " + data.lastname
        })
      )
    };

    getUserData();
  }, []);

  function PressHandlerDashboard(title) {
    switch (title) {
      case 'A':
        console.log("a");
        //navigation.navigate()
        break;
      case 'B':
        console.log("b");
        //navigation.navigate()
        break;
      case 'C':
        console.log("c");
        //navigation.navigate()
        //testing for output
        checkDB();
        break;
      case 'D':
        console.log("d");
        testing();

        //navigation.navigate()
        break;
      default:
        console.log("something went wrong");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
          />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.signInText}>Hello {userInfo?.firstname.toUpperCase()}!</Text>
          <Text style={styles.welcomeText}>What would you like to do?</Text>
        </View>

        <View style={styles.searchAddressBar}>
          <FromAddressSearchBar />
        </View>

        <View style={styles.navContainer}>
          <NavOptions userType={userInfo?.usertype} userInfo={userInfo} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  header: {
    marginTop: height * 0.05,
    height: height * 0.07,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    height: '100%',
    width: "35%",
    resizeMode: "contain",
  },
  logOutBTN: {
    color: AppStyles.color.salmonred,
    fontSize: 20,
  },
  welcomeContainer: {
    padding: 10,
    paddingTop: 20,
  },
  signInText: {
    color: AppStyles.color.platinum,
    fontWeight: "bold",
    fontSize: AppStyles.textFontSizes.header,
  },
  welcomeText: {
    color: AppStyles.color.platinum,
    lineHeight: 25,
    paddingBottom: "7%",
    fontSize: AppStyles.fontSize.normal,
  },
  searchAddressBar: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
  },
  navContainer: {
    position: "absolute",
    alignSelf: "center",
    marginTop: height * 0.39,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});
