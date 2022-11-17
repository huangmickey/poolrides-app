import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";  
import { useNavigation } from '@react-navigation/native';
import { AppStyles } from '../../utils/styles';

import { StatusBar } from 'expo-status-bar';

import Map from '../../components/Map';
import tw from "tailwind-react-native-classnames";

import {authentication } from '../../firebase/firebase-config';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 

export default function RideResults({ route }) {

  const navigation = useNavigation();
  const [driverInfoCurr, setDriverInfoCurr] = useState({ lat: 0.1, lng: 0.1 });
  const [driverData, setDriverData] = useState(null);
  const [serverResponse, setServerResponse] = useState({ status: null, data: null });

  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarVisisble, setSnackBarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackBarVisible(false);

  const cancelURL = "https://us-central1-pool-rides-db.cloudfunctions.net/cancelRide";
  const updateURL = "https://us-central1-pool-rides-db.cloudfunctions.net/getDriverLoc";

  // const cancelURL = "http://192.168.1.19:5001/pool-rides-db/us-central1/cancelRide";
  // const updateURL = "http://192.168.1.19:5001/pool-rides-db/us-central1/getDriverLoc";

  useEffect(() => {
    if(route.params.data != null) { 
      setDriverData(route.params.data); 
    }   

    async function ready() {
      await updateDriverLoc();
    }
    ready(); 

    const updateDriverInterval = setInterval(async () => {
      await updateDriverLoc();
    }, 15000);
    return () => clearInterval(updateDriverInterval);
  }, []);

  async function updateDriverLoc () {
    var refreshToken = await authentication.currentUser.getIdToken(true);
    const userUID = authentication.currentUser.uid;
    // console.log(userUID)

    try {
      const axios = require('axios').default;
      var config = {
        method: 'post',
        url: updateURL,
        headers: {
          'Authorization': 'Bearer ' + refreshToken,
        },
        data: {"riderUID": userUID}
      };

      axios(config)
        .then(async function (response) {
          setServerResponse({ status: response.status, data: response.data });
          setDriverInfoCurr({lat: response.data.lat, lng: response.data.lng})
          console.log(JSON.stringify(response.data))
        })
        .catch(async function (error) {
          if (error.response) {
            setServerResponse({ status: error.response.status, data: error.response.data });
          }
          if (error.request) {
            setServerResponse({ status: error.request.status, data: error.response.data });
          }
        });
    } catch (e) {
      console.warn(e);
      setServerResponse({ status: "P404", data: "Error connecting to server. Please try again" });
    }
  }

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.map}>
        <StatusBar style='dark' />
        <Map hasDriver={{ lat: driverInfoCurr.lat, lng: driverInfoCurr.lng }} />
      </View>

      <View style={styles.center}>
        <Text style={styles.driverInfo}>Driver Info</Text>
      </View>
       
      <View style={styles.infoGroup}>
        {driverData?.profilePicture == null || driverData?.profilePicture == "" 
        ?
        <EvilIcons name="user" size={90} color="white" />
        :
        <Image source={driverData.profilePicture} style={styles.bottomIcons} /> 
        }

        <View style={styles.leftContent}>
          <Text style={styles.name}>
            {driverData?.driverName.length < 16
            ?
            driverData?.driverName
            :
            driverData?.driverName.substring(0,16) + '...'
            }
          </Text> 
        </View>
      </View>

      <View style={tw`mt-auto border-t border-gray-300`}>
        <TouchableOpacity
          style={tw`bg-white rounded-full py-3 m-3 `}
          onPress={async () => {
            var refreshToken = await authentication.currentUser.getIdToken(true);
            const userUID = authentication.currentUser.uid;
            try {
              const axios = require('axios').default;
              var config = {
                method: 'post',
                url: cancelURL,
                headers: {
                  'Authorization': 'Bearer ' + refreshToken,
                },
                data: { "riderUID": userUID }
              };

              axios(config)
                .then(async function (response) {
                  setSnackBarText("Your Ride Has Been Canceled.")
                  setSnackBarVisible(true);
                  await timeout(3500);
                  navigation.goBack();
                })
                .catch(async function (error) {
                  setSnackBarText("An Error has occured. Reload App")
                  setSnackBarVisible(true);
                  await timeout(3500);
                  navigation.goBack();
                });
              } catch (e) {
                console.warn(e);
              }
            }}>
          <Text style={tw`text-center text-black text-xl`}>
            Cancel Ride
          </Text>
        </TouchableOpacity>
      </View>
      
      <Snackbar
        theme={{
          colors: {
            onSurface: AppStyles.color.gray,
            surface: AppStyles.color.white,
            accent: AppStyles.color.salmonred,
          },
        }}
        visible={snackBarVisisble}
        duration={3500}
        onDismiss={onDismissSnackBar}
        action={{
          label: '',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {snackBarText}
      </Snackbar>
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
    height: '70%',
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  driverInfo: {
    color: AppStyles.color.platinum,
    justifyContent: 'flex-start',
    fontSize: 26,
  },
  infoGroup: {
    flexDirection: 'row',
    marginTop: height * 0.02,
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
});