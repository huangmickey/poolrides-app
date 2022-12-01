import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { AppStyles, AppIcon } from '../../utils/styles';
import { collection, query, where } from 'firebase/firestore/lite';
import { doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';

const { width } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);
const defaultPicture = AppIcon.images.placeHolder;


export default function RideHistory({ navigation }) {
  const [DATA, setDATA] = useState(null)
  const [selectedId, setSelectedId] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const userUID = authentication.currentUser.uid;
  useEffect(() => {
    console.log(userUID)
    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
    };
    getUserData();

  }, []);

  useEffect(() => {
    const rideHistoryRef = collection(db, "rideHistory")
    if (userInfo !== undefined && userInfo.usertype === "Driver") {
      const q = query(rideHistoryRef, where("driverUID", "==", userUID))
      const getQueryDocs = async () => {
        const querySnapshot = await getDocs(q)
        let data = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const rideData = doc.data()
          let dateArr = rideData.Date.split(",")
          data.push(
            {
              id: doc.id,
              name: rideData.body.riderName,
              date: dateArr[0],
              time: dateArr[1],
              distTraveled: rideData.body.travelTime_distance,
              timeTraveled: rideData.body.travelTime_time,
              rideStyle: "XL",
              cost: rideData.body.travelTime_cost.toFixed(2),
            }
          )
          setDATA(data)
        });
      }
      getQueryDocs()

    } else if (userInfo !== undefined && userInfo.usertype === "Rider") {
      const q = query(rideHistoryRef, where("body.riderUID", "==", userUID))
      const getQueryDocs = async () => {
        const querySnapshot = await getDocs(q)
        let data = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const rideData = doc.data()
          let dateArr = rideData.Date.split(",")
          data.push(
            {
              id: doc.id,
              name: rideData.driverName,
              date: dateArr[0],
              time: dateArr[1],
              distTraveled: rideData.body.travelTime_distance,
              timeTraveled: rideData.body.travelTime_time,
              rideStyle: "XL",
              cost: rideData.body.travelTime_cost.toFixed(2),
            }
          )
          setDATA(data)
        });
      }
      getQueryDocs()
    }
  }, [userInfo])

  function profilePic(user) {
    if (user.profilePicture == null || user.profilePicture == "") {
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
        {item.profilePicture == null || item.profilePicture == ""
          ?
          <EvilIcons name="user" size={70} color="white" />
          :
          <Image source={item.profilePicture} style={styles.bottomIcons} />
        }

        <View style={styles.rightContent}>
          <Text style={[styles.nameText, textColor]}>{item.name}</Text>
          <Text style={[styles.dateText, textColor]}>{item.date} - {item.time}</Text>
          <Text style={[styles.traveledText, textColor]}>{item.distTraveled} | {item.timeTraveled}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <Text style={[styles.costText, textColor]}>${item.cost}</Text>
        <Text style={[styles.ridestyle, textColor]}>{item.rideStyle}</Text>
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
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    marginVertical: 2,
    marginHorizontal: 5,

    borderColor: AppStyles.color.gray,
    borderRadius: 20,
    borderWidth: 1,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: thumbMeasure / 2,
    height: thumbMeasure / 2,
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
  flatList: {
    backgroundColor: AppStyles.color.black
  }
});