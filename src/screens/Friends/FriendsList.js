import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                               
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 
const defaultPicture = AppIcon.images.placeHolder;


export default function FriendsList({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  const [DATA, setDATA] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Steve1",
      profilePicture: "",
      username: "stevey1",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Steve2",
      profilePicture: "",
      username: "stevey2",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Steve3",
      profilePicture: "",
      username: "stevey3",
    },
    {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    name: "Steve4",
    profilePicture: "",
    username: "stevey4",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
      name: "Steve5",
      profilePicture: "",
      username: "stevey5",
    },
  ]);

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



  function viewProfileHandler(user) {
    console.log("View friend profile button was pressed on user: " + user.id)

    // navigation.navigate("Dashboard", {userID: id});
    //Send a call to the database to fetch data about this user and present it to the page.
    //Note, the profile page can be made universal. All you need to do is pass it the UID and it can retrieve it live.
  }

  function messageHandler(user) {
    console.log("Message friend button was pressed on user: " + user.id)
    navigation.navigate("DMS");
    // navigation.navigate("DMS", {userID: id});
    //Send a call to the database retrieve conversation stored between these two users
  }

  function deleteFriendHandler(user) {
    console.log("Delete friend button was pressed on user: " + user.id)
    let remainingArr = DATA.filter(data => data != user);
    setDATA(remainingArr);
    //Send a call to the database to remove this UID from your list. But leave yours in the otehr UID
  }


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
    <TouchableOpacity onPress={() => viewProfileHandler(item)} style={[styles.item, backgroundColor]}>
      <View style={styles.infoGroup}>
        <Image source={profilePic(item)} style={styles.bottomIcons} /> 
        <Text style={[styles.title, textColor]}>{item.name}</Text>
      </View>
      <View style={styles.infoGroup}>
        <TouchableOpacity onPress={() => messageHandler(item)} >
            <Image source={defaultPicture} style={styles.infoIcons}/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteFriendHandler(item)}>
            <Image source={defaultPicture} style={styles.infoIcons} /> 
        </TouchableOpacity>
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
        refreshing={!refreshFlatlist}
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