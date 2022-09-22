import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                               
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Steve1",
    username: "stevey1",
    date: "Mar 16",
    time: "6:59 PM",
    distTraveled: "15.3 mi",
    timeTeaveled: "18m 40s",
    rideStyle: "XL",
    cost: "19.54",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Steve2",
    username: "stevey2",
    date: "Mar 16",
    time: "6:59 PM",
    distTraveled: "15.3 mi",
    timeTeaveled: "18m 40s",
    rideStyle: "XL",
    cost: "19.54",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Steve3",
    username: "stevey3",
    date: "Mar 16",
    time: "6:59 PM",
    distTraveled: "15.3 mi",
    timeTeaveled: "18m 40s",
    rideStyle: "XL",
    cost: "19.54",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    name: "Steve4",
    username: "stevey4",
    date: "Mar 16",
    time: "6:59 PM",
    distTraveled: "15.3 mi",
    timeTeaveled: "18m 40s",
    rideStyle: "XL",
    cost: "19.54",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    name: "Steve5",
    username: "stevey5",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    name: "Steve6",
    username: "stevey6",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bs",
    name: "Steve1",
    username: "stevey1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97fqw",
    name: "Steve2",
    username: "stevey2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dfd",
    name: "Steve3",
    username: "stevey3",
  },
  {
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bbdf",
  name: "Steve4",
  username: "stevey4",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97ffg",
    name: "Steve5",
    username: "stevey5",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dtr",
    name: "Steve6",
    username: "stevey6",
},
];

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 
const defaultPicture = AppIcon.images.placeHolder;


export default function RideHistory({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userUID = authentication.currentUser.uid; 

    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
      console.log(userInfo);
    };

    getUserData();
  }, []);

  function profilePic(user){
    if(user.profilePicture == null || user.profilePicture == "") {
      return defaultPicture;
    } else {
      return user.profilePicture;
    }
}

  const renderItem = ({ item }) => {
    const backgroundColor = AppStyles.color.black
    const color = AppStyles.color.platinum;

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity style={[styles.item, backgroundColor]}>

      <View style={styles.leftContent}>
        <Image source={profilePic(item)} style={styles.profileIcon} /> 
        
        <View style={styles.rightContent}>
        <Text style={[styles.nameText, textColor]}>{item.name}</Text>
        <Text style={[styles.dateText, textColor]}>{item.date} - {item.time}</Text>
        <Text style={[styles.traveledText, textColor]}>{item.distTraveled} | {item.timeTeaveled}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <Text style={[styles.costText, textColor]}>${item.cost}</Text>
        <Text style={[styles.rideStyle, textColor]}>{item.rideStyle}</Text>
      </View>

    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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

    borderColor: AppStyles.color.darkgray,
    borderRadius: 20,
    borderWidth: 1,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: thumbMeasure/2,
    height: thumbMeasure/2,
    marginRight: 10,
    borderRadius: 1000,
  },
  nameText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
  },
  traveledText: {
    fontSize: 12,
  },




  
  rightContent: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  costText: {
    justifyContent: 'flex-start',
    fontSize: 18,
  },
  ridestyle: {
    justifyContent: 'flex-start',
    fontSize: 16,
  },
});