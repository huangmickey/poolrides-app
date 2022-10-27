import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from "tailwind-react-native-classnames";
import { AppStyles } from '../utils/styles';

import { useSelector } from "react-redux";
import { selectRideInformation } from '../../slices/navSlice';

export default function RiderPaymentCard() {

    const navigation = useNavigation();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const rideInformation = useSelector(selectRideInformation);
    // console.log('These are the TravelTime Info', rideInformation);

    return (
        <View style={styles.container}>
            <View style={tw`mt-auto border-t border-gray-300`}>
                <TouchableOpacity
                    style={tw`bg-white rounded-full py-3 m-3 `} //${!selected && "bg-gray-300"}`}
                    onPress={() => {

                        //setPaymentSuccess(); // First check if payment went through

                        // if(payment){
                        navigation.navigate("Rider Ride Search");
                        // } else {
                        //     ThrownError
                        // }
                    }}
                >
                    <Text style={tw`text-center text-black text-xl`}>
                        Make Payment
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
});
