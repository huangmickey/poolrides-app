import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Dimensions, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from "react-native-paper";
import * as Location from 'expo-location'

import { selectDriverLocation, selectPushToken, selectDriverName } from '../../../slices/navSlice';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import { getLocationPermission } from '../../utils/gpsUtils';
import { config } from "../../../config";
import mapStyle from ' ../../../components/mapStyle.json'
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore/lite";
import { authentication, db } from "../../firebase/firebase-config";
import { setDriverLocation } from '../../slices/navSlice';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);

export default function DriverMap({ route, navigation }) {
  const driverLocation = useSelector(selectDriverLocation)
  const driverPushToken = useSelector(selectPushToken)
  const driverName = useSelector(selectDriverName)
  const [receivedRideRequest, setReceivedRideRequest] = useState(false)
  const [notificationData, setNotificationData] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const { startBackgroundLocation, getGPSLocation } = getLocationPermission();
  const [AcceptedRideRequest, setAcceptedRideRequest] = useState(false)
  const [canceledRideModal, setCanceledRideModal] = useState(false)
  const [text, setText] = useState('')
  const [animate, setAnimate] = useState(true)
  const mapRef = useRef(null)

  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarVisisble, setSnackBarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const dispatch = useDispatch()

  const [isCloseToDestination, setIsCloseToDestination] = useState(false);

  const driverUID = authentication.currentUser.uid
  const completeRideURL = "https://us-central1-pool-rides-db.cloudfunctions.net/completeride";

  useEffect(() => {
    getGPSLocation()
    goOnline()
  }, [])


  useEffect(() => {
    if (notificationData !== undefined && driverLocation !== undefined) {
      const markers = [
        {
          latitude: notificationData.origin.lat,
          longitude: notificationData.origin.lng,
        },
        {
          latitude: notificationData.destination.lat,
          longitude: notificationData.destination.lng
        }
      ]
      mapRef.current.fitToCoordinates(markers, {
        edgePadding: { top: 75, right: 75, bottom: 75, left: 75 },
        animated: true
      });
    }
  }, [notificationData])

  // runs on route params
  useEffect(() => {
    if (route.params !== undefined) {
      if (route.params.notificationData.notificationType === 'rideReceived') {
        setReceivedRideRequest(true)
        setModalVisible(true)
        setNotificationData(route.params.notificationData)
      } else if (route.params.notificationData.notificationType === 'rideCanceled') {
        setCanceledRideModal(true)
      }
    }
  }, [route])

  //UseEffect for Waiting for Map to Load
  useEffect(() => {
    setText('Loading Map...')
    const timer = setTimeout(() => {
      setText('Loading Map...' + '\n' + 'Just a little bit longer...')
    }, 5000);
    return () => clearTimeout(timer)
  }, [setTimeout])

  //UseEffect for every 15 seconds
  useEffect(() => {
    // Background Location
    // startBackgroundLocation()
    const updateDBInterval = setInterval(() => {
      // getGPSLocation()
      updateLocationToDB()
    }, 5000);
    return () => clearInterval(updateDBInterval);
  }, []);



  //UseEffect for checking Haversine every 5 seconds
  // useEffect(() => {
  //   if (AcceptedRideRequest) {
  //     const checkHaversine = setInterval(() => {

  //       // 1 = Destination
  //       // 2 = Driver Location
  //       var lat1 = notificationData.destination.lat;
  //       var lon1 = notificationData.destination.lng;

  //       var lat2 = ;
  //       var lon2 = ;


  //       if ((lat1 === lat2) && (lon1 === lon2)) {
  //         return 0;
  //       } else {
  //         var radlat1 = Math.PI * lat1 / 180;
  //         var radlat2 = Math.PI * lat2 / 180;
  //         var theta = lon1 - lon2;
  //         var radtheta = Math.PI * theta / 180;
  //         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //         if (dist > 1) {
  //           dist = 1;
  //         }
  //         dist = Math.acos(dist);
  //         dist = dist * 180 / Math.PI;
  //         dist = dist * 60 * 1.1515;
  //         return dist;
  //       }

  //     }, 5000);
  //     return () => clearInterval(checkHaversine);
  //   }
  // }, [AcceptedRideRequest]);










  async function updateLocationToDB() {
    try {
      var location = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
      console.log('This location is being printed every 5s: (lat: ', location.coords.latitude, ' long: ', location.coords.longitude, ')')
      const data = {
        driverID: driverUID,
        driverPushToken: driverPushToken.pushToken,
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }, 2000
      )
      const docRef = doc(db, 'activeDrivers', driverUID);
      await setDoc(docRef, data, { merge: true });

      dispatch(setDriverLocation({
        driverLocation: location
      }))

    } catch {
      console.log('catch')
      location = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
    }
  }























  async function goOffline() {
    await deleteDoc(doc(db, "activeDrivers", driverUID));
    navigation.navigate('Driver Dashboard')
  }

  async function goOnline() {
    if (driverLocation !== undefined) {
      const data = {
        driverID: driverUID,
        driverPushToken: driverPushToken.pushToken,
        lat: driverLocation.driverLocation.coords.latitude,
        lng: driverLocation.driverLocation.coords.longitude,
        isBusy: false,
      }
      mapRef.current.animateToRegion(
        {
          latitude: driverLocation.driverLocation.coords.latitude,
          longitude: driverLocation.driverLocation.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }, 2000
      )
      const docRef = doc(db, 'activeDrivers', driverUID);
      await setDoc(docRef, data, { merge: true });
    }
  }

  async function acceptRide() {
    // notificationData.rideDoc
    const docRef = doc(db, 'rides', notificationData.riderUID);
    const activeDriverDocRef = doc(db, 'activeDrivers', driverUID);

    await updateDoc(docRef, {
      isAccepted: true,
      driverUID: driverUID,
      driverName: driverName.driverName,
      driverPushToken: driverPushToken.pushToken,
    });
    await updateDoc(activeDriverDocRef, {
      isBusy: true
    });
    setModalVisible(!modalVisible)
    setAcceptedRideRequest(true)
    setReceivedRideRequest(false)
  }

  async function rejectRide() {
    console.log('Ride Rejected')
    setModalVisible(!modalVisible)
    setAcceptedRideRequest(false)
    setReceivedRideRequest(false)
  }

  function handleGetDirections() {
    if (notificationData !== undefined) {
      const destinationLat = notificationData.destination.lat
      const destinationLng = notificationData.destination.lng
      const originLat = notificationData.origin.lat
      const originLng = notificationData.origin.lng
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving&dir_action=navigate&waypoints=${originLat},${originLng}`
      Linking.openURL(url);
      console.log('Google Trip URL: ' + url)
    } else {
      Alert.alert('Error 500: Internal Server Error')
    }
  }


















  async function rideComplete() {
    // Makes the post request to rideComplete backend function
    // needs to pass in riderUID and riderPushToken

    // Reset everything for Driver

    var refreshToken = await authentication.currentUser.getIdToken(true);
    const userUID = authentication.currentUser.uid;
    try {
      const axios = require('axios').default;

      var config = {
        method: 'post',
        url: completeRideUrl,
        headers: {
          'Authorization': 'Bearer ' + refreshToken,
        },
        data: {
          "riderUID": notificationData.riderUID,
          "riderPushToken": notificationData.riderPushToken
        }
      };

      axios(config)
        .then(async function (response) {
          setSnackBarText("Your Ride Is Complete.")
          setSnackBarVisible(true);
          await timeout(3500);
          goOffline()
          navigation.goBack();
        })
        .catch(async function (error) {
          console.log(error.response.status)
          console.log(error.request.status)
          setSnackBarText("An Error has occured. Reload App")
          setSnackBarVisible(true);
          setIsCanceled(true);
          await timeout(3500);
          navigation.pop(2);
          navigation.goBack();
        });

    } catch (e) {
      console.warn(e);
    }
  }


















  return (
    <View style={styles.container}>

      {driverLocation && <MapView
        ref={mapRef}
        style={styles.mapStyle}
        pitchEnabled={false}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: driverLocation.driverLocation.coords.latitude,
          longitude: driverLocation.driverLocation.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
        customMapStyle={mapStyle}
      >

        {notificationData?.destination ? <MapViewDirections
          origin={{
            latitude: driverLocation.driverLocation.coords.latitude,
            longitude: driverLocation.driverLocation.coords.longitude
          }}
          destination={`${notificationData.destination.lat},${notificationData.destination.lng}`}
          waypoints={[`${notificationData.origin.lat},${notificationData.origin.lng}`]}
          apikey={config.GOOGLE_DIRECTIONS_APIKEY}
          strokeWidth={3}
          strokeColor={AppStyles.color.salmonred}
          lineDashPattern={[0]}
        /> : <></>}

        <Marker
          image={require('../../../assets/car-128px.png')}
          // image={require('./car-128px.png')}
          coordinate={{
            latitude: driverLocation.driverLocation.coords.latitude,
            longitude: driverLocation.driverLocation.coords.longitude,
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Driver'}
        />

        {AcceptedRideRequest && <Marker
          image={require('../../../assets/person-128px_inverted.png')}
          //image={require('./person-128px_inverted.png')}
          coordinate={{
            latitude: notificationData.origin.lat, //38.558227 
            longitude: notificationData.origin.lng, //-121.4266 
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Pick Up Location'}
        />}

        {AcceptedRideRequest && <Marker
          coordinate={{
            latitude: notificationData.destination.lat, //38.568491 
            longitude: notificationData.destination.lng, //-121.418 
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Drop Off Here'}
        />}
      </MapView>}

      {!driverLocation && <View style={styles.loadingGroup}>
        <ActivityIndicator animating={animate} size="large" color={AppStyles.color.platinum} />
        <Text style={styles.loadingText}>{text}</Text>
      </View>}

      {AcceptedRideRequest && <View style={styles.mapButton}>
        <CustomButton stretch={true} title={"Open in Google Maps"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={handleGetDirections} />
      </View>}






















      {AcceptedRideRequest && isCloseToDestination
        ?
        <View style={styles.offlineButton}>
          <CustomButton stretch={true} title={"Ride Complete"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={rideComplete} />
        </View>
        :
        AcceptedRideRequest && !isCloseToDestination
          ?
          <View style={styles.offlineButton}>
            <CustomButton stretch={true} title={"Ride Complete"} color={AppStyles.color.gray} textColor={AppStyles.color.black} />
          </View>
          :
          <View style={styles.offlineButton}>
            <CustomButton stretch={true} title={"Go Offline"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={goOffline} />
          </View>}























      {receivedRideRequest &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Origin: {notificationData.originAddress}{"\n"}
                Destination: {notificationData.destinationAddress}{"\n"}
                Money Earned: {notificationData.travelTime_cost}{"\n"}
                Distance: {notificationData.travelTime_distance}{"\n"}
                Time: {notificationData.travelTime_time}
              </Text>
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.buttonAccept]}
                  onPress={acceptRide}>
                  <Text style={styles.modalButtonText}>Accept Ride</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.buttonReject]}
                  onPress={rejectRide}>
                  <Text style={styles.modalButtonText}>Reject Ride</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }

      {canceledRideModal &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={canceledRideModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!canceledRideModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                The ride has been canceled
              </Text>
              <View style={[styles.modalButtonContainer, { alignSelf: 'center' }]}>
                <Pressable
                  style={[styles.modalButton, styles.buttonAccept]}
                  onPress={() => {
                    setCanceledRideModal(!canceledRideModal);
                    setAcceptedRideRequest(false)
                    // setNotificationData({origin: notificationData.origin, destination: {lat: undefined, lng: undefined}})
                  }}>
                  <Text style={styles.modalButtonText}>Continue</Text>
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

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  mapStyle: {
    height: height * 0.7,
    width: width
  },
  loadingGroup: {
    alignItems: "center",
    marginTop: height * 0.3
  },
  loadingText: {
    color: AppStyles.color.platinum,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: "5%"
  },
  mapButton: {
    width: width,
    marginTop: 10,
  },
  offlineButton: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    height: '25%',
    backgroundColor: AppStyles.color.gray,
    borderRadius: 25,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 5,
  },
  modalText: {
    textAlign: 'justify',
    color: AppStyles.color.black,
    fontWeight: 'bold',
    marginTop: 4
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '12%'
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: AppStyles.color.blue,
  },
  buttonReject: {
    backgroundColor: AppStyles.color.salmonred,
  },
  modalButtonText: {
    color: AppStyles.color.platinum,
    fontWeight: 'bold',
    fontSize: 16,
  },
});