import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, StyleSheet, Platform, Text, Pressable, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore/lite";
import { authentication, db } from "../../firebase/firebase-config";
import * as Location from 'expo-location'
import { useSelector, useDispatch } from 'react-redux';
import { selectDriverLocation, setDriverLocation, selectPushToken, selectDriverName } from '../../../slices/navSlice';
import { AppStyles } from '../../utils/styles';

export default function DriverMap({ route, navigation }) {
  const [errorMsg, setErrorMsg] = useState();
  const dispatch = useDispatch()
  const driverLocation = useSelector(selectDriverLocation)
  const driverPushToken = useSelector(selectPushToken)
  const driverName = useSelector(selectDriverName)
  const mapRef = useRef(null);
  const driverUID = authentication.currentUser.uid

  const [receivedRideRequest, setReceivedRideRequest] = useState(false)
  const [notificationData, setNotificationData] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  // runs on route params
  useEffect(() => {
    setReceivedRideRequest(false)
    if (route.params !== undefined) {
      setReceivedRideRequest(true)
      setModalVisible(true)
      setNotificationData(route.params.notificationData)
    }
  }, [route])

  async function goOffline() {
    await deleteDoc(doc(db, "activeDrivers", driverUID));
    navigation.navigate('Driver Dashboard')
  }

  async function goOnline() {
    const data = {
      driverID: driverUID,
      driverPushToken: driverPushToken.pushToken,
      lat: driverLocation.driverLocation.coords.latitude,
      lng: driverLocation.driverLocation.coords.longitude,
      isBusy: false,
    }
    const docRef = doc(db, 'activeDrivers', driverUID);
    await setDoc(docRef, data, { merge: true });
  }

  async function updateLocationInDB() {
    const data = {
      lat: driverLocation.driverLocation.coords.latitude,
      lng: driverLocation.driverLocation.coords.longitude
    }
    const docRef = doc(db, 'activeDrivers', driverUID);
    await updateDoc(docRef, data);
  }

  // Timer useEffect to get location updates every 15000ms
  useEffect(() => {

    goOnline()

    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        } else if (status === 'granted') {
          if (Platform.OS === 'android') {
            status = await Location.requestBackgroundPermissionsAsync()
          }
          if (status !== 'granted') {
            setErrorMsg('Permission to access background location was denied')
            return;
          } else if (status === 'granted') {
            await getCurrentPosition()
            await updateLocationInDB()
            // console.log("lat = ", driverLocation.driverLocation.coords.latitude, " long = ", driverLocation.driverLocation.coords.longitude)
          }
        }
      })();
    }, 15000);
    return () => clearInterval(interval);

  }, []);

  async function getCurrentPosition() {
    try {
      var location = await Location.getCurrentPositionAsync({});
    } catch {
      location = await Location.getCurrentPositionAsync({});
    }
    dispatch(
      setDriverLocation({
        driverLocation: location
      }))
  }

  async function acceptRide() {
    // notificationData.rideDoc
    const docRef = doc(db, 'rides', notificationData.riderUID);
    const activeDriverDocRef = doc(db, 'activeDrivers', driverUID);

    await updateDoc(docRef, {
      isAccepted: true,
      driverUID: driverUID,
      driverName: driverName.driverName,
    });
    await updateDoc(activeDriverDocRef, {
      isBusy: true
    });
    setModalVisible(!modalVisible)
  }

  async function rejectRide() {
    console.log('Ride Rejected')
    setModalVisible(!modalVisible)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: driverLocation.driverLocation.coords.latitude,
            longitude: driverLocation.driverLocation.coords.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          }}
          customMapStyle={mapStyle}>

          <Marker
            image={require('./car-128px.png')}
            coordinate={{
              latitude: driverLocation.driverLocation.coords.latitude,
              longitude: driverLocation.driverLocation.coords.longitude,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Driver'}
          />
        </MapView>

      </View>

      <View style={styles.driverHUD}>

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


      </View>

    </SafeAreaView>
  );
};

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '35%',
  },
  driverHUD: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    top: '71%',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },



  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '75%',
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
  },
  modalText: {
    textAlign: 'justify',
    color: AppStyles.color.black,
    fontWeight: 'bold'
  },
});