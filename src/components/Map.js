import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { config } from "../../config";

function Map({ hasDriver }) {

    const [driverMaker, setDriverMaker] = useState({ isDriver: false, lat: null, lng: null });

    useEffect(() => {
        if (hasDriver) {
            setDriverMaker({ isDriver: true, lat: hasDriver.lat, lng: hasDriver.lng });
        }
    }, [hasDriver]);

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) {
            console.log('return');
            return;
        } else {
            const markers = [
                {
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                },
                {
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }
            ]
            mapRef.current.fitToCoordinates(markers, {
                edgePadding: { top: 75, right: 75, bottom: 75, left: 75 },
                animated: true
            });
        }

    }, [origin, destination]);

    // Retrieve Route information via Google Matrix API
    // Returns Distance, Time, and Etc. from Origin to Destination
    useEffect(() => {
        // If Origin Or Destination is not filled out then just return and do not retrieve matrix info
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=
            ${origin.description}&destinations=${destination.description}
            &key=${config.GOOGLE_DISTANCEMATRIX_APIKEY}`
            ).then((res) => res.json())
                .then(data => {
                    // console.log(data.rows[0].elements[0]);
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                })
        };

        getTravelTime();
    }, [origin, destination])

    return (

        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            pitchEnabled={false}
            mapType='mutedStandard'
            loadingEnabled={true}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={config.GOOGLE_DIRECTIONS_APIKEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifer="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifer="destination"
                />
            )}

            {driverMaker?.isDriver && (
                <Marker
                    coordinate={{
                        latitude: driverMaker.lat,
                        longitude: driverMaker.lng,
                    }}
                />
            )}
        </MapView>
    )
}
export default Map;