import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";   
import { EvilIcons , AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';                                                         
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 
const defaultPicture = AppIcon.images.placeHolder;

export default function Settings({ navigation }) {

  const [userInfo, setUserInfo] = useState();

  const [DATA] = useState([
    {
      id: 1,
      pageName: "Account Settings",
      pageNavigation: "Account Settings",
      pageIcon: "user",
      //User settings
    },
    // {
    //   id: 2,
    //   pageName: "Friends List",
    //   pageNavigation: "Friends List",
    //   pageIcon: "users",
    //   //Routes to friends List
    // },
    // {
    //   id: 3,
    //   pageName: "Notifications",
    //   pageNavigation: "Notifications",
    //   pageIcon: "mail",
    //   //Notifications
    // },
    {
      id: 4,
      pageName: "Privacy",
      pageNavigation: "Privacy",
      pageIcon: "database",
      //Settings to enable or disable data collection
    },
    {
      id: 5,
      pageName: "Security",
      pageNavigation: "Security",
      pageIcon: "lock",
      //IDK What to add here
    },
    {
      id: 6,
      pageName: "Help",
      pageNavigation: "Help",
      pageIcon: "octagon",
      //Submit Bug Reports, Support Tickets, 
    },
    {
      id: 7,
      pageName: "About",
      pageNavigation: "About",
      pageIcon: "help-circle",
      //Review Terms of Service, Privacy Policy, Information about Company 
    },
  ]);


  useEffect(() => {
    const userUID = authentication.currentUser.uid;
    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
    };

    getUserData();
  }, []);

  function logoutHandler() {
    authentication.signOut().then(() => console.log("User Logged Out"));
  } 

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  function settingsHandler(item) {
    console.log("We will now navigate to: " + item.pageNavigation)
    navigation.navigate(item.pageNavigation);
  }

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => settingsHandler(item)} style={styles.item}>
      <View style={styles.infoGroup}>
      <Feather name={item.pageIcon} size={25} color="white" /> 
        <Text style={styles.pageName}>  {item.pageName}</Text>
      </View>
      <View style={styles.infoGroup}>
        <MaterialIcons name="keyboard-arrow-right" size={30} color='white' style={styles.infoIcons}/>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View >
              <View style={styles.bar}></View>

              <Text style={{color: 'white', alignSelf: 'center', marginTop: 10}}>Pool Rides</Text>
              <Text style={{color: 'white', margin: 25, textAlign: 'justify'}}>Pool Rides is developing a new branch within the ride sharing space known as insta transit. The business model for PoolRides differs from the similar applications as 
              PoolRides goal is to deliver a personalized ride experience for every user. The app would allow riders to plot a trip and match with transporters, while the transporters will be able to see 
              unaccepted trips in the area and choose whether or not to take the fare. The riders will also be able to personalize a profile of their preferences, including music tastes, conversation topics, 
              and other preferences in order to have the best ride sharing experience possible, setting Poolrides apart from their competitors. The users will be divided into two groups, riders and transporters. 
              To handle this there will be two different dashboards based on the user type in order to handle different functions of each role.</Text>
              
              <View style={styles.bar}></View>

              <TouchableOpacity style={styles.textContainer} onPress={logoutHandler}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          }
        />
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppStyles.color.black,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    marginVertical: 2,
    marginHorizontal: 5,

    backgroundColor: AppStyles.color.black,
    borderColor: AppStyles.color.darkgray,
    borderRadius: 20,
    borderWidth: 1,
  },
  pageName: {
    color: AppStyles.color.platinum,
    justifyContent: 'flex-start',
    fontSize: 16,
  },

  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoIcons: {
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  bar: {
    marginTop: '5%',
    paddingBottom: 20,
    
    borderColor: AppStyles.color.darkgray,
    borderTopWidth: 1,
  },

  textContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    paddingBottom: 5,
  },
  logoutText: {
    color: AppStyles.color.salmonred,
    fontSize: 24,    
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 10,

    backgroundColor: AppStyles.color.black,
    borderColor: AppStyles.color.darkgray,
    borderRadius: 20,
    borderWidth: 1, 
  },
});






 

