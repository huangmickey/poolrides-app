import React, { useState } from 'react';
import { Button, View, Text, Alert, Image } from 'react-native';
import { AppStyles, IDStyle } from '../../utils/styles';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton'
import { useSelector } from 'react-redux';
import { selectDriverName } from '../../../slices/navSlice';


export default function ChangeProfilePic({ driverVerification }) {
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(null);
  const navigation = useNavigation();
  const userUID = authentication.currentUser.uid;
  const userDocRef = doc(db, "users", userUID);
  const driverName = useSelector(selectDriverName)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 9],
      quality: 1,
    });

    console.log(result);

    //TODO: create folder for each driver, link URL to driverID.
    if (!result.cancelled) {
      setImage(result);
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
            updateDoc(userDocRef, { ProfilePicture: downloadURL });
            setIsUploaded(true);
          })

      } catch (e) {
        Alert.alert('Unhandled Exception', 'Please try again');
      }
    }
  };

  function continueHandler() {
    if (driverName === null) {
      navigation.navigate("Rider Dashboard")
    } else {
      navigation.navigate("Driver Dashboard")
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={IDStyle.title}>Profile Picture</Text>
      <Text style={IDStyle.subTitle}>Please upload a Profile Picture</Text>
      <Button title='Choose Photo' onPress={pickImage} />
      {isUploaded && <Image source={{ uri: image.uri }} style={{ width: 400, height: 400, resizeMode: 'contain' }} />}
      {isUploaded &&
        <View style={{ width: AppStyles.textInputWidth.main }}>
          <CustomButton
            stretch={true}
            title='Continue'
            color={AppStyles.color.mint}
            textColor='black'
            onPress={continueHandler}
          />
        </View>
      }
    </View>
  );
}