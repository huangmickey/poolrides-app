import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { AppStyles } from '../utils/styles';
import { Icon } from 'react-native-elements';
import tw from "tailwind-react-native-classnames";
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

import BASIC_IMG from '../../assets/basiccar.png'
import XL_IMG from "../../assets/xlcar.png";
import NIGHTSWIMMING_IMG from "../../assets/nightswimming.png";
import { selectTravelTimeInformation } from '../../slices/navSlice';
import { useSelector } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
const BASIC = Image.resolveAssetSource(BASIC_IMG).uri;
const XL = Image.resolveAssetSource(XL_IMG).uri;
const NIGHTSWIMMING = Image.resolveAssetSource(NIGHTSWIMMING_IMG).uri;

const rideOptionsData = [
    {
        id: 'Basic',
        title: 'Basic',
        cost: 1.85,
        img: BASIC,
        // img: Image.resolveAssetSource
    },
    {
        id: 'XL',
        title: 'XL',
        cost: 1.95,
        img: XL,
    },
    {
        id: 'NightSwim',
        title: 'NightSwim',
        cost: 1,
        img: NIGHTSWIMMING,
    }
];


export default function RideOptionsCard() {
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    return (
        <SafeAreaView style={tw`bg-black flex-grow`}>
            <Text style={styles.header}>Choose Ride - {travelTimeInformation?.distance.text}</Text>

            <FlatList
                data={rideOptionsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, cost, img }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-3 ${id === selected?.id && "bg-gray-500"}`}
                    >
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: img }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.time}>{travelTimeInformation?.duration.text} travel time</Text>
                        </View>
                        <Text style={styles.cost}>
                            {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'USD',
                                compactDisplay: 'short',
                            }).format(
                                (travelTimeInformation?.distance.value * cost * 0.000621371)
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto border-t border-gray-300`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-white rounded-full py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-black text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        color: AppStyles.color.platinum,
        alignSelf: 'center',
        fontWeight: '700',
        paddingTop: '1%',
        fontSize: 25,
        paddingBottom: '8%',
    },
    title: {
        color: AppStyles.color.platinum,
        fontWeight: '700',
        fontSize: 18,
    },
    time: {
        color: AppStyles.color.platinum,
        fontWeight: '400',
        fontSize: 14,
    },
    cost: {
        color: AppStyles.color.platinum,
        fontWeight: '700',
        fontSize: 20,
    },
    choose: {
        color: AppStyles.color.platinum,
        fontSize: 30,
    }
});