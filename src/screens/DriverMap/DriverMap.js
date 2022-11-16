import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, StyleSheet, Text, Pressable, Modal, ActivityIndicator, Linking } from 'react-native';
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
import mapStyle from ' ../../../components/mapStyle.json'

export default function DriverMap({ route, navigation }) {
  const driverLocation = useSelector(selectDriverLocation)
  const driverPushToken = useSelector(selectPushToken)
  const driverName = useSelector(selectDriverName)
  const driverUID = authentication.currentUser.uid
  const [receivedRideRequest, setReceivedRideRequest] = useState(false)
  const [notificationData, setNotificationData] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const { startBackgroundLocation, getGPSLocation } = getLocationPermission();
  const [AcceptedRideRequest, setAcceptedRideRequest] = useState(false)
  const [canceledRideModal, setCanceledRideModal] = useState(false)
  const [text,setText] = useState('')
  const [animate,setAnimate] = useState(true)
  const mapRef = useRef(null)


  useEffect(() => {
    getGPSLocation()
    goOnline()
  }, [driverLocation])


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

  useEffect(() => {
    // Background Location
    // startBackgroundLocation()
    const updateDBInterval = setInterval(() => {
    getGPSLocation()
    // Foreground Location
    }, 15000);
        return () => clearInterval(updateDBInterval);
}, []);

useEffect(() => {
    setText('Loading Map...')
    setTimeout(() => {
        setText('Loading Map...' + '\n' + 'Just a little bit longer...')
    }, 5000);
},[setTimeout])

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
            },2000
        )
          const docRef = doc(db, 'activeDrivers', driverUID);
          await setDoc(docRef, data, { merge: true });
    }
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

  return (
    <SafeAreaView style={{ flex: 1 }}>

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

        {notificationData?.destination && <MapViewDirections
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
        
        /> }

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
        {!driverLocation &&<ActivityIndicator
            style={styles.loadingMap}
            animating={animate}
            size="large" 
            color={"#AFAFAF"}
       />}
      {!driverLocation && <Text style= {styles.loadingText}>{text}</Text>}

      <View style={styles.driverHUD}>
        {AcceptedRideRequest && <CustomButton stretch={true} title={"Open in Google Maps"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={handleGetDirections} />}
        <View style={styles.space} />
        <CustomButton stretch={true} title={"Go Offline"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={goOffline} />
            </View>
      </View>

        <View>
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
                <View style={styles.modalButtonContainer}>
                  <Pressable
                    style={[styles.modalButton, styles.buttonAccept]}
                    onPress={() => setCanceledRideModal(!canceledRideModal)}>
                    <Text style={styles.modalButtonText}>Continue</Text>
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
    position: 'relative',
    flex: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    top: '65%',
    paddingTop:'25%',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  space: {
    height: 20,
    width: 20 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  loadingText: {
    textAlign: 'center',
    color: '#AFAFAF',
    fontWeight: 'bold',
    top:'32.5%',
  },
  loadingMap: {
    flex: 1,
    position: 'absolute',
    top:'25%',
    left:'45%',
    justifyContent: 'center',
    alignItems: "center",

  },
  edgePadding: {
    top: '5%',
    left: '5%',
    bottom: '5%',
    right: '5%'
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