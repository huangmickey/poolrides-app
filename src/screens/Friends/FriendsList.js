import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"; 
import { EvilIcons , AntDesign, Feather } from '@expo/vector-icons';  
import SearchBar from "../../components/SearchBar";                                                        
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 
const defaultPicture = AppIcon.images.placeHolder;


export default function FriendsList({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const [userInfo, setUserInfo] = useState(false);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [isClicked, setIsClicked] = useState(false);


  //////////////////////////////////////////////TEMP MOCK DATA/////////////////////////////////////////////////////////
  const [DATA, setDATA] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Steve Jobsasasasasasa",
      profilePicture: "",
      username: "steve1",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Steve Wazniak",
      profilePicture: "",
      username: "steve2",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Steven Universe",
      profilePicture: "",
      username: "steve3",
    },
    {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    name: "Steve Minecraft",
    profilePicture: "",
    username: "steve4",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
      name: "Steve",
      profilePicture: "",
      username: "steve5",
    },
  ]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

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
 
    if (searchPhrase == "") {
      return (<Item
        item={item}
        onPress={() => viewProfileHandler(item.id)}
      />);
    } 
    // filter of the name
    if (item.name.toString().toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return (<Item
        item={item}
        onPress={() => viewProfileHandler(item.id)}
      />);
    } 
    // filter of the description
    if (item.username.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return (<Item
        item={item}
        onPress={() => viewProfileHandler(item.id)}
      />);
    }
  };

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => viewProfileHandler(item)} style={styles.item}>
      <View style={styles.infoGroup}>
        {item.profilePicture == null || item.profilePicture == "" 
        ?
        <EvilIcons name="user" size={70} color="white" />
        :
        <Image source={item.profilePicture} style={styles.bottomIcons} /> 
        }
        <View style={styles.leftContent}>
          <Text style={styles.name}>
            {item.name.length < 16
            ?
            item.name
            :
            item.name.substring(0,16) + '...'
            }
          </Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>
      <View style={styles.infoGroup}>
        <TouchableOpacity onPress={() => messageHandler(item)} >
          <Feather name="message-square" size={30} color='white' style={styles.infoIcons} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteFriendHandler(item)}>
          <AntDesign name="delete" size={30} color='white' style={styles.infoIcons}/> 
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchBar}>
        <SearchBar
          isClicked={isClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setIsClicked={setIsClicked}
        />
      </View>

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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppStyles.color.black,
  },
  searchBar: {
    alignSelf: 'center'
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
  leftContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    color: AppStyles.color.platinum,
    justifyContent: 'flex-start',
    fontSize: 20,
  },
  username: {
    color: AppStyles.color.platinum,
    justifyContent: 'flex-start',
    fontSize: 16,
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
  },
  infoIcons: {
    justifyContent: 'flex-end',

    marginRight: 15,

  },
});






 

