import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { config } from "../../config";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from '../../slices/navSlice';
import { AppStyles } from '../utils/styles';

export default function FromAddressSearchBar() {
    const dispatch = useDispatch();

    return (
        <GooglePlacesAutocomplete
            placeholder="Where From?"
            enablePoweredByContainer={false}
            textInputProps={{
                keyboardAppearance: 'dark',
            }}
            styles={{
                container: {
                    flex: 0,
                    width: '80%',
                },
                textInput: {
                    fontSize: 18,
                    backgroundColor: AppStyles.color.gray,
                },
                textInputContainer: {
                    backgroundColor: 'black',
                },
                row: {
                    backgroundColor: AppStyles.color.gray,
                },

            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
                key: config.GOOGLE_PLACES_APIKEY,
                language: "en",
            }}
            onPress={(data, details = null) => {
                // console.log(data, 'DATA')
                // console.log(detail, 'DETAIL')
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))

                dispatch(setDestination(null))
            }}
            fetchDetails={true}
            returnKeyType={"search"}

            minLength={2}
        />
    )
}