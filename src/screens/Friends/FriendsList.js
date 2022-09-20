import React, { useState} from 'react';
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                               
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Steve1",
    username: "stevey1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Steve2",
    username: "stevey2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Steve3",
    username: "stevey3",
  },
  {
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
  name: "Steve4",
  username: "stevey4",
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
const profilePicture = AppIcon.images.placeHolder;





export default function FriendsList({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);



  const renderItem = ({ item }) => {
    const backgroundColor = AppStyles.color.black
    const color = AppStyles.color.platinum;

    return (
      <Item
        item={item}
        onPress={() => viewProfileHandler(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => viewProfileHandler(item.id)} style={[styles.item, backgroundColor]}>
      <View style={styles.infoGroup}>
        <Image source={profilePicture} style={styles.bottomIcons} /> 
        <Text style={[styles.title, textColor]}>{item.name}</Text>
      </View>
      <View style={styles.infoGroup}>
        <TouchableOpacity onPress={() => messageHandler(item.id)} >
            <Image source={profilePicture} style={styles.infoIcons}/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteFriendHandler(item.id)}>
            <Image source={profilePicture} style={styles.infoIcons} /> 
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  function viewProfileHandler(id) {
    console.log("View friend profile button was pressed on user: " + id)
    //Send a call to the database to fetch data about this user and present it to the page.
    //Note, the profile page can be made universal. All you need to do is pass it the UID and it can retrieve it live.
  }
  
  function messageHandler(id) {
    console.log("Message friend button was pressed on user: " + id)
    //Send a call to the database retrieve conversation stored between these two users
  }
  
  function deleteFriendHandler(id) {
    console.log("Delete friend button was pressed on user: " + id)
    //Send a call to the database to remove this UID from your list. But leave yours in the otehr UID
  }

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
  title: {
    justifyContent: 'flex-start',
    fontSize: 24,
  },
  bottomIcons: {
    justifyContent: 'flex-start',
    width: thumbMeasure/2,
    height: thumbMeasure/2,
    marginRight: 10,
    borderRadius: 1000,
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoIcons: {
    justifyContent: 'flex-end',
    width: thumbMeasure/3,
    height: thumbMeasure/3,
    marginRight: 10,
    borderRadius: 1000,
  },
});