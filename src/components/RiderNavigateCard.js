import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Button } from 'react-native';
import { AppStyles } from '../utils/styles';
import { config } from "../../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux"
import { setDestination } from '../../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

export default function RiderNavigateCard() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            {/* <Text style={styles.header}>PoolRides</Text> */}
            <View style={styles.searchContainer}>

                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Where To?'
                        debounce={400}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        query={{
                            key: config.GOOGLE_PLACES_APIKEY,
                            language: 'en',
                        }}
                        returnKeyType={"default"}
                        minLength={2}
                        onPress={
                            (data, details = null) => {
                                dispatch(
                                    setDestination({
                                        location: details.geometry.location,
                                        description: data.description,
                                    }))

                                navigation.navigate("RideOptionsCard");
                            }}

                        textInputProps={{
                            keyboardAppearance: 'dark',
                        }}
                        styles={{
                            container: {
                                paddingTop: 20,
                                flex: 0,
                            },
                            textInput: {
                                backgroundColor: AppStyles.color.gray,
                                borderRadius: 8,
                                fontSize: 18,
                            },
                            textInputContainer: {
                                paddingHorizontal: 20,
                                paddingBottom: 0,
                            },
                            row: {
                                backgroundColor: 'gray',
                                padding: 15,
                            },
                            separator: {
                                backgroundColor: 'black',
                                height: 2,
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', paddingTop: '20%', justifyContent: 'space-evenly' }}>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    header: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: AppStyles.fontSize.content,
    },
    searchContainer: {
        // borderTopColor: AppStyles.color.platinum,
        // borderTopWidth: 1,
        // flex: 1,
    },
});
