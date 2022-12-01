import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);
const defaultPicture = AppIcon.images.placeHolder;

export default function Privacy({ navigation }) {

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userUID = authentication.currentUser.uid;
    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
    };
    getUserData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {userInfo
        ?
        <Text style={{ color: 'white', alignSelf: 'center' }}>The welcome to the Privacy page:{userInfo?.profilePicture}</Text>
        :
        <Text style={{ color: 'white', alignSelf: 'center' }}>The Privacy page is missing</Text>
      }
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: AppStyles.color.black,
  },
});