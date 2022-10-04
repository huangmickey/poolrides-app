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
    {
      id: 2,
      pageName: "Friends List",
      pageNavigation: "Friends List",
      pageIcon: "users",
      //Routes to friends List
    },
    {
      id: 3,
      pageName: "Notifications",
      pageNavigation: "Notifications",
      pageIcon: "mail",
      //Notifications
    },
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

              <Text style={{color: 'white'}}>Pool Rides</Text>
              <Text></Text>
              <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
              <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

                <View style={styles.bar}></View>

              <TouchableOpacity style={styles.textContainer} onPress={logoutHandler}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.textContainer} onPress={logoutHandler}>
                <Text style={styles.logoutText}>Delete Account</Text>
              </TouchableOpacity> */}
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






 

