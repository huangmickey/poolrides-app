import { StyleSheet, TextInput, Text, View, Image, FlatList, SafeAreaView, StatusBar } from 'react-native';
import React, { useState, useEffect } from "react";
import DashboardButton from '../../components/DashboardButton';
import { AppStyles } from '../../utils/styles';
import { db, authentication } from '../../firebase/firebase-config';
import { BottomNavigation } from 'react-native-paper';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore/lite';

import CustomButton from '../../components/CustomButton';
import { borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function RiderDashboard({ navigation }) {

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // Update the document title using Firebase SDK
    const userUID = authentication.currentUser.uid           // Coming from auth when logged in

    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
      console.log(userInfo);
    }

    getUserData();
  });

  function logoutHandler() {
    console.log("User Logged Out");
    authentication.signOut();
  }


  //const auth = getAuth();  
  //const email = auth.currentUser.email;


  async function checkDB() {

    const userUID = authentication.currentUser.uid;

    const userDocReference = doc(db, "users", userUID);
    const userDocSnapshot = await getDoc(userDocReference);


    if (userDocSnapshot.exists()) {

      const userFirstName = userDocSnapshot.data().firstname;
      console.log(userFirstName);
    }
    else {
      console.log("No Such Document!");
    }
  }


  function testing() {

    console.log(auth.currentUser.email);

  }

  //want to add some icons to buttons
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

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'A',
      icon: "../../../assets/history.png",
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'B',
      icon: "../../../assets/history.png",
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'C',
      icon: "../../../assets/history.png",
    },
    {
      id: '1234123047',
      title: 'D',
      icon: "../../../assets/history.png",
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <DashboardButton
        title={title} color={AppStyles.color.mint} textColor={AppStyles.color.black} icon={"../../../assets/history.png"} onPress={() => PressHandlerDashboard(title)}
      />
    </View>
  );
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );



  return (
    <SafeAreaView style={styles.container}>
      <Text>
        <Text style={styles.text}>Welcome </Text>
        <Text style={styles.name}>{userInfo?.firstname}! </Text>
      </Text>
      <Text style={styles.text}>This is the Rider Dashboard</Text>
      <CustomButton
        title='Log out'
        color={AppStyles.color.mint}
        textColor={AppStyles.color.white}
        onPress={logoutHandler} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        scrollEnabled={isScrollEnabled}
      />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  text: {
    color: AppStyles.color.white,
  },
  container: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: AppStyles.color.black,


  },
  item: {
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 32,
  },
  name: {
    color: AppStyles.color.white,
    fontWeight: 'bold'
  }
});
