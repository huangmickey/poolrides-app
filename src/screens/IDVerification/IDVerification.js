import React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { IDStyle } from '../../utils/styles';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';


export default function IDVerification({ driverVerification }) {

    const userUID = authentication.currentUser.uid;
    const userDocRef = doc(db, "users", userUID);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
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
                        Alert.alert(
                            'Upload to Server Successful!',
                            'Welcome to your dashboard!',
                            {
                                text: "Ok",
                                onPress: driverVerification(true),

                            },
                        );
                        updateDoc(userDocRef, { isVerified: true });
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
