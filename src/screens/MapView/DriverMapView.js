import React, { useEffect,useState, useRef } from 'react';
import { Button, Dimensions, Image, ImageBackground, Text, View, StyleSheet, Platform } from 'react-native';     
import MapView, { Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { authentication, db } from "../../firebase/firebase-config";


export default function DriverMapView() {
    const [userInfo, setUserInfo] = useState();
    const [isOnline, setIsOnline] = useState();


    useEffect(() => {

        const getUserData = async () => {
            const userUID = authentication.currentUser.uid;
            const userDocReference = doc(db, "users", userUID);
            const userDocSnapshot = await getDoc(userDocReference);
            setUserInfo(userDocSnapshot.data());
            await updateDoc(userDocReference, {isDriverOnline: true});
            setIsOnline(userDocSnapshot.data().isDriverOnline);
        };
        getUserData();
        //console.log(isOnline);
    }, [isOnline]);
    

        return (
            <SafeAreaView style={{flex: 1}}>

              <View style={styles.container}>

                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.mapStyle}
                  initialRegion={{
                    latitude: 38.581573,
                    longitude: -121.494400,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  customMapStyle={mapStyle}>

                  <Marker
                    draggable
                    coordinate={{
                      latitude: 38.581573,
                      longitude: -121.494400,
                    }}
                    onDragEnd={
                      (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                    }
                    title={'Driver'}
                  />
                </MapView>
              
              </View>
            
              <View style={styles.driverHUD}></View>

            </SafeAreaView>
          );
        };
        const mapStyle = [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}],
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}],
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}],
          },
        ];
        const styles = StyleSheet.create({
          container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'flex-end',
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
            flex: 0,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            top: '71%',
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
          },
        });



