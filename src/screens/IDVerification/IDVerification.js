import React, { useState } from 'react';
import { Button, StyleSheet, View, Image, Text, Alert } from 'react-native';
import { IDStyle } from '../../utils/styles';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-web';
import { storage } from '../../firebase/firebase-config';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';


export default function IDVerification({ navigation }) {

    const userDocRef = (doc(db, "users", userUID));

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        //TODO: create folder for each driver, link URL to driverID.
        if (!result.cancelled) {
            const storage = getStorage();
            const imgName = new Date().toISOString();
            const ref_con = ref(storage, imgName);
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            try {
                uploadBytes(ref_con, bytes)
                    .then(snapshot => {
                        return getDownloadURL(snapshot.ref)
                    })
                    .then(downloadURL => {
                        console.log('Download URL: ', downloadURL);
                        updateDoc(userDocRef, { DriverID: downloadURL });
                        Alert.alert('Upload to Server Successful!', 'Returning to Driver Dashboard.');
                    })

            } catch (e) {
                Alert.alert('Unhandled Exception', 'Please try again');
            }

        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={IDStyle.title}>Driver Verification</Text>
            <Text style={IDStyle.subTitle}>Please upload the front of your Driver's License</Text>
            <Button title='Choose Photo' onPress={pickImage} />
        </View>
    );
}
