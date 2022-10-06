import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import Button from 'react-native-button';
import { AppStyles } from "../../utils/styles";
import { authentication, db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";
import NavOptions from "../../components/NavOptions";
import { useNavigation } from "@react-navigation/native";
import FromAddressSearchBar from "../../components/FromAddressSearch";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 

export default function RiderDashboard() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // Update the document title using Firebase SDK
    const userUID = authentication.currentUser.uid; // Coming from auth when logged in

    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
    };

    getUserData();
  }, []);

  // function logoutHandler() {
  //   authentication.signOut().then(() => console.log("User Logged Out"));
  // } 

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
    <SafeAreaView style={styles.container}>
      <View style={{zIndex: 99, height: height * 0.38}}>
        <View style={styles.header}>  
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
          />

          {/* <View style={{justifyContent: 'center'}}>
            <Button
              style={styles.logOutBTN}
              onPress={logoutHandler}
            >Log Out</Button>
          </View> */}
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.signInText}>Hello {userInfo?.firstname}!</Text>
          <Text style={styles.welcomeText}>What would you like to do?</Text>
        </View>
        <View style={styles.searchAddressBar}>
          <FromAddressSearchBar/>
        </View>
      </View>

      <View style={styles.navContainer}>
        <NavOptions userType={userInfo?.usertype} userInfo={userInfo}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  header: {
    marginTop: height * 0.05,
    height: height * 0.08,
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
  logOutBTN:{
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

  },
  navContainer: {  
    backgroundColor: AppStyles.color.black,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
});
