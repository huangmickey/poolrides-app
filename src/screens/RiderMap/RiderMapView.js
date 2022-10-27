import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../../../slices/navSlice';

import RiderNavigateCard from '../../components/RiderNavigateCard';
import RideOptionsCard from '../../components/RideOptionsCard';
import Map from '../../components/Map';
import { StatusBar } from 'expo-status-bar';
import RiderPaymentCard from '../../components/RidePaymentCard';

export default function RiderMapView() {
    const Stack = createNativeStackNavigator();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <View>
                <View style={styles.map}>
                    <StatusBar style='dark' />
                    <Map />
                </View>
                <View style={styles.stackNavigator}>
                    <Stack.Navigator
                        screenOptions={{
                            animation: 'slide_from_right'
                        }}>
                        <Stack.Screen
                            name="RiderNavigateCard"
                            component={RiderNavigateCard}
                            options={{
                                headerShown: false,
                            }}/>
                        <Stack.Screen
                            name="RideOptionsCard"
                            component={RideOptionsCard}
                            options={{
                                headerShown: false,
                            }}/>
                        <Stack.Screen
                            name="RidePayment"
                            component={RiderPaymentCard}
                            options={{
                                headerShown: false,
                            }}/>
                    </Stack.Navigator>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    map: {
        height: '50%',
    },
    stackNavigator: {
        height: '50%',
    },
});