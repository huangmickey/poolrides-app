import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                               
import { AppStyles, AppIcon } from '../../utils/styles';

import Map from '../../components/Map';
import { StatusBar } from 'expo-status-bar';

import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

export default function RideResults({ navigation }) {

  const [driverInfoOrig, setDriverInfoOrig] = useState({driver: true, lat: 38.4, lng: -121.4});
  const [driverInfoCurr, setDriverInfoCurr] = useState({driver: true, lat: 38.4, lng: -121.4});

//   Success we can now update the Drivres Marker with this
//   useEffect( async () => {

//       await timeout(5000);
//       setDriverInfo({driver: true, lat: 38.5, lng: -121.5});
//       await timeout(5000);
//       setDriverInfo({driver: true, lat: 38.6, lng: -121.6});
//       await timeout(5000);
//       setDriverInfo({driver: true, lat: 38.7, lng: -121.7});
//       await timeout(5000);
//       setDriverInfo({driver: true, lat: 38.8, lng: -121.8});
//       await timeout(5000);
//       setDriverInfo({driver: true, lat: 38.9, lng: -121.9});

//   }, []);

//   function timeout(delay) {
//     return new Promise( res => setTimeout(res, delay) );
// }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <Map hasDriver={{driver: true, lat: driverInfoCurr.lat, lng: driverInfoCurr.lng}}/>
      </View>
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
    map: {
      height: '100%',
  },
});