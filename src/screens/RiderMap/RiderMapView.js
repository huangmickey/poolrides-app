import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RiderNavigateCard from '../../components/RiderNavigateCard';
import RideOptionsCard from '../../components/RideOptionsCard';
import Map from '../../components/Map';
import { StatusBar } from 'expo-status-bar';

export default function RiderMapView() {
    const Stack = createNativeStackNavigator();
    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    // useEffect(() => {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //       setErrorMsg('Permission to access location was denied');
    //       return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    //   })();
    // }, []);

    // let text = 'Waiting..';
    // if (errorMsg) {
    //   text = errorMsg;
    // } else if (location) {
    //   text = JSON.stringify(location);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View>
                <View style={styles.map}>
                    <StatusBar style='dark' />
                    <Map />
                </View>



                <View style={styles.stackNavigator}>

                    <Stack.Navigator>

                        <Stack.Screen
                            name="RiderNavigateCard"
                            component={RiderNavigateCard}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="RideOptionsCard"
                            component={RideOptionsCard}
                            options={{
                                headerShown: false,
                            }}
                        />

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