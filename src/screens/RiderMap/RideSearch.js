import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from "react-native-paper";
import { authentication } from "../../firebase/firebase-config";
import tw from "tailwind-react-native-classnames";
import { AppStyles } from '../../utils/styles';
import { selectOrigin, selectDestination, selectTravelTimeInformation, selectRideInformation, selectPushToken } from '../../../slices/navSlice'

export default function RideSearch() {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const rideInformation = useSelector(selectRideInformation);
    const pushToken = useSelector(selectPushToken);

    const navigation = useNavigation();
    const [snackBarText, setSnackBarText] = useState("Your Ride Has Been Canceled.");
    const [snackBarVisisble, setSnackBarVisible] = useState(false);
    const onDismissSnackBar = () => setSnackBarVisible(false);

    const [isSearching, setIsSerching] = useState(true);
    const [serverResponse, setServerResponse] = useState({ status: null, data: null });

    // const baseURL = 'https://us-central1-pool-rides-db.cloudfunctions.net/requestride';
    const baseURL = "http://192.168.1.19:5002/pool-rides-db/us-central1/requestride";

    useEffect(() => {
        async function sendRequest() {

            var refreshToken = await authentication.currentUser.getIdToken(true);
            const userUID = authentication.currentUser.uid;

            try {
                const axios = require('axios').default;
                var data = {
                    "pushToken": pushToken.pushToken,
                    "userID": userUID,
                    "originLat": origin.location.lat,
                    "originLng": origin.location.lng,
                    "originAddress": origin.originAddress,
                    "destinationLat": destination.location.lat,
                    "destinationLng": destination.location.lng,
                    "destinationAddress": destination.destinationAddress,
                    "travelTime_distance": travelTimeInformation.distance.text,
                    "travelTime_cost": travelTimeInformation.distance.value * rideInformation.rideCost * 0.000621371,
                    "travelTime_time": travelTimeInformation.duration.text,
                    "ride_type": rideInformation.rideType
                };

                var config = {
                    method: 'post',
                    url: baseURL,
                    headers: {
                        'Authorization': 'Bearer ' + refreshToken,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                console.log(config);

                axios(config)
                    .then(async function (response) {
                        setServerResponse({ status: response.status, data: response.data });

                        await timeout(2000); //added as Firestore is to fast. 
                        setIsSerching(false);

                        await timeout(4000); //added to make it look like something is happening.

                        navigation.pop();
                        navigation.navigate("Ride Results")
                    })
                    .catch(async function (error) {
                        if (error.response) {
                            setServerResponse({ status: error.response.status, data: error.response.data });
                        }
                        if (error.request) {
                            setServerResponse({ status: error.request.status, data: error.response.data });
                        }
                        await timeout(2000); //added as Firestore is to fast. 
                        setIsSerching(false);

                    });
            } catch (e) {
                console.warn(e);
                setServerResponse({ status: "P404", data: "Error connecting to server. Please try again" });

                await timeout(2000); //added as Firestore is to fast. 
                setIsSerching(false);
            }
        }
        sendRequest();
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    return (
        <View style={styles.container}>
            {isSearching
                ?
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={AppStyles.color.platinum} />
                    <Text style={styles.text}>We are currently searching for a driver.</Text>
                </View>
                :

                serverResponse.status == 200
                    ?
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={AppStyles.color.platinum} />
                        <Text style={styles.text}>We Found you a Driver</Text>
                        <Text style={styles.text}>We just need to finalize the trip</Text>


                        {/* <Text></Text>
                <Text style={styles.text}>Response Code: {serverResponse.status}</Text>
                 <Text style={styles.text}>{serverResponse.data.message}</Text>
                <Text style={styles.text}>{JSON.stringify(serverResponse.data.driver)}</Text> */}
                    </View>
                    :
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={AppStyles.color.platinum} />
                        <Text style={[styles.text, styles.spacing]}>There seems to be an issue</Text>
                        <Text style={styles.text}>Error Code: {serverResponse.status}</Text>
                        <Text style={[styles.text, styles.spacing]}>{serverResponse.data}</Text>
                        <Text style={styles.text}>Please try again</Text>
                        <Text style={styles.text}>If the issue persists, reload the app</Text>
                        <Text style={styles.text}>or submit a bug report</Text>
                    </View>
            }

            <View style={tw`mt-auto border-t border-gray-300`}>
                <TouchableOpacity
                    style={tw`bg-white rounded-full py-3 m-3 `} //${!selected && "bg-gray-300"}`}
                    onPress={async () => {

                        var refreshToken = await authentication.currentUser.getIdToken(true);

                        var config = {
                            method: 'post',
                            url: cancelURL,
                            headers: {
                                'Authorization': 'Bearer ' + refreshToken,
                            },
                            data: { userID: userUID }
                        };
                        axios(config)
                            .then(function (response) {
                                setSnackBarVisible(true);
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                                setResponse({
                                    status: 400,
                                    data: "Something went wrong.\nPlease try again"
                                });
                            });
                        navigation.goBack();
                    }}>
                    <Text style={tw`text-center text-black text-xl`}>
                        Cancel Ride
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    text: {
        color: AppStyles.color.platinum,
    },
    spacing: {
        marginBottom: "5%"
    }
});