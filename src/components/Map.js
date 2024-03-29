import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { config } from "../../config";
import mapStyle from '../components/mapStyle.json'
import { AppStyles } from '../utils/styles';
import { Image } from 'react-native';

function Map({ hasDriver }) {

    const [driverMaker, setDriverMaker] = useState({ lat: null, lng: null });

    useEffect(() => {
        if (hasDriver) {
            setDriverMaker({ lat: hasDriver.lat, lng: hasDriver.lng });
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
        } else if (driverMaker.lat != null || driverMaker.lng != null) {
            const markers = [
                {
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                },
                {
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                },
                {
                    latitude: driverMaker.lat,
                    longitude: driverMaker.lng,
                }
            ]
            mapRef.current.fitToCoordinates(markers, {
                edgePadding: { top: 75, right: 75, bottom: 75, left: 75 },
                animated: true
            });
        }
        else {
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
    }, [origin, destination, driverMaker]);

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
            loadingEnabled={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            customMapStyle={mapStyle}
        >

            {origin && destination &&
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={config.GOOGLE_DIRECTIONS_APIKEY}
                    strokeWidth={3}
                    strokeColor={AppStyles.color.mint}
                />
            }

            {origin?.location &&
                <MapView.Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifer="origin"
                >
                    <Image
                        source={require('../../assets/man-100px.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </MapView.Marker>
            }

            {destination?.location &&
                <MapView.Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifer="destination"
                >
                    <Image
                        source={require('../../assets/flag-128px.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </MapView.Marker>
            }

            {driverMaker?.lat &&
                <MapView.Marker
                    coordinate={{
                        latitude: driverMaker.lat,
                        longitude: driverMaker.lng,
                    }}
                >
                    <Image
                        source={require('../../assets/hovercar-128px.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </MapView.Marker>
            }
        </MapView>
    )
}
export default Map;