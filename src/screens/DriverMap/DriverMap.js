import React, { useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet, Text, Pressable, Modal, ActivityIndicator,Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore/lite";
import { authentication, db } from "../../firebase/firebase-config";
import { useSelector, useDispatch } from 'react-redux';
import { selectDriverLocation, selectPushToken, selectDriverName, selectLocationPermissionStatus } from '../../../slices/navSlice';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import { getLocationPermission } from '../../utils/gpsUtils';
import MapViewDirections from 'react-native-maps-directions';
import { config } from "../../../config";

export default function DriverMap({ route, navigation }) {
  const driverLocation = useSelector(selectDriverLocation)
  const driverPushToken = useSelector(selectPushToken)
  const driverName = useSelector(selectDriverName)
  const driverUID = authentication.currentUser.uid
  const [receivedRideRequest, setReceivedRideRequest] = useState(false)
  const [notificationData, setNotificationData] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const { startBackgroundLocation, getGPSLocation } = getLocationPermission();
  const [AcceptedRideRequest,setAcceptedRideRequest] = useState(false)


  let riderTrip = {
    origin: {
        latitude: null,
        longitude: null
    },
    destination: {
        latitude: null,
        longitude: null
    }
  }

useEffect(() => {
    if (driverLocation !== undefined) {
        goOnline();
    }
},[driverLocation])

useEffect(() => {
    if (notificationData !== undefined) {
        riderTrip.origin.latitude = notificationData.origin.latitude
        riderTrip.origin.longitude = notificationData.origin.longitude
        riderTrip.destination.latitude = notificationData.destination.latitude
        riderTrip.destination.longitude = notificationData.destination.longitude
    }
},[notificationData])

  // runs on route params
  useEffect(() => {
    setReceivedRideRequest(false)
    if (route.params !== undefined) {
      setReceivedRideRequest(true)
      setModalVisible(true)
      setNotificationData(route.params.notificationData)
      setAcceptedRideRequest(true)
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


  useEffect(() => {
    // Background Location
    // startBackgroundLocation()
    const updateDBInterval = setInterval(() => {
      getGPSLocation()
      // Foreground Location
    }, 15000);
    return () => clearInterval(updateDBInterval);
  }, []);

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
  }

  async function rejectRide() {
    console.log('Ride Rejected')
    setModalVisible(!modalVisible)
  }

  function handleGetDirections() {
    if (notificationData !== undefined) {
        const destinationLat = notificationData.destination.lat
        const destinationLng = notificationData.destination.lng
        const originLat = notificationData.origin.lat
        const originLng = notificationData.origin.lng
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving&dir_action=navigate&waypoints=${originLat},${originLng}`
        Linking.openURL(url);
        console.log('Google Trip URL ===> ' + url)
    } else {
        Alert.alert('uh oh')
    }

}


  return (
    <SafeAreaView style={{ flex: 1 }}>

    <View style={styles.container}>

      {driverLocation && <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: driverLocation.driverLocation.coords.latitude,
          longitude: driverLocation.driverLocation.coords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
        customMapStyle={mapStyle}>
        
        {/* {notificationData && <MapViewDirections
          destination={riderTrip.destination} 
          waypoints={[{
              latitude: riderTrip.origin.latitude,
              longitude: riderTrip.origin.longitude
          }]} 
          apikey={config.GOOGLE_DIRECTIONS_APIKEY}
          strokeWidth={3}
          strokeColor={AppStyles.color.mint}
          // lineDashPattern={[0]}
        
        /> } */}

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

         {AcceptedRideRequest && <Marker
          image={require('./person-128px_inverted.png')}
          coordinate={{
            latitude: notificationData.origin.lat, //38.558227 
            longitude: notificationData.origin.lng, //-121.4266 
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Pick Up Location'}
        /> }

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
      {!driverLocation && <Text style = {styles.modalText}>Loading Map...</Text>}
    </View>
      
      <View style={styles.driverHUD}>
      {AcceptedRideRequest && <CustomButton stretch={true} title={"Open in Google Maps"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={handleGetDirections} />}
      <View style = {styles.space}/>
      <CustomButton stretch={true} title={"Go Offline"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={goOffline} />

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