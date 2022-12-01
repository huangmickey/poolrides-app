import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, Pressable } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import CustomChip from '../../components/Chip';
import { StatusBar } from 'expo-status-bar';

import Map from '../../components/Map';
import tw from "tailwind-react-native-classnames";

import { authentication } from '../../firebase/firebase-config';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);

export default function RideResults({ route }) {

  const navigation = useNavigation();
  const [driverInfoCurr, setDriverInfoCurr] = useState({ lat: 0.1, lng: 0.1 });
  const [driverData, setDriverData] = useState(null);
  const [serverResponse, setServerResponse] = useState({ status: null, data: null });
  const [driverInterests, setDriverInterests] = useState(null)
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarVisisble, setSnackBarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const [interestsModal, setInterestsModal] = useState(false)
  const cancelURL = "https://us-central1-pool-rides-db.cloudfunctions.net/cancelride";
  const updateURL = "https://us-central1-pool-rides-db.cloudfunctions.net/getdriverloc";
  useEffect(() => {
    if (route.params.data != null) {
      setDriverData(route.params.data);
    }

    async function ready() {
      await updateDriverLoc();
    }
    ready();

    // const updateDriverInterval = setInterval(async () => {
    //   await updateDriverLoc();
    // }, 15000);
    return () => clearInterval(updateDriverInterval);
  }, []);
  async function updateDriverLoc() {
    var refreshToken = await authentication.currentUser.getIdToken(true);
    const userUID = authentication.currentUser.uid;

    try {
      const axios = require('axios').default;
      var config = {
        method: 'post',
        url: updateURL,
        headers: {
          'Authorization': 'Bearer ' + refreshToken,
        },
        data: { "riderUID": userUID }
      };

      axios(config)
        .then(async function (response) {
          setServerResponse({ status: response.status, data: response.data });
          setDriverInfoCurr({ lat: response.data.lat, lng: response.data.lng })
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

  function handleInterestsButton() {
    setInterestsModal(true)
  }

  function closeInterestsModal() {
    setInterestsModal(!interestsModal)
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
              driverData?.driverName.substring(0, 16) + '...'
            }
          </Text>
          <CustomButton stretch={false} title={"Interests"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={handleInterestsButton} width={100}></CustomButton>
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


      {
        interestsModal &&

        <Modal
          animationType="slide"
          transparent={true}
          visible={interestsModal}
          onRequestClose={() => {
          }}>
          <View style={styles.interestsCenteredView}>
            <View style={styles.interestsModalView}>
              <Text style={styles.interestsModalText}>Driver Interests</Text>
              <ScrollView persistentScrollbar={true} style={styles.scrollView}>
                <View style={styles.interestsModal}>
                  {
                    Array.from(Object.entries(driverData.driverInterests).sort()).map((entry) => {
                      const [key] = entry;
                      return (<CustomChip key={key} interest={key} interestsObj={driverData.driverInterests} flagForMap={true} />);
                    })
                  }
                </View>
              </ScrollView>
              <View style={styles.interestsModalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.buttonAccept]}
                  onPress={closeInterestsModal}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  name: {
    color: AppStyles.color.platinum,
    justifyContent: 'flex-start',
    fontSize: 20,
  },
  modalButtonText: {
    color: AppStyles.color.platinum,
    fontWeight: 'bold',
    fontSize: 16,
  },
  interestsModal: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollView: {
    height: '50%',
    marginTop: '10%',
  },
  interestsCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interestsModalView: {
    width: '85%',
    height: '35%',
    backgroundColor: AppStyles.color.gray,
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  interestsModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
  },
  interestsModalText: {
    color: AppStyles.color.black,
    fontWeight: '700',
    fontSize: AppStyles.fontSize.normal,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: AppStyles.color.blue,
  },
});