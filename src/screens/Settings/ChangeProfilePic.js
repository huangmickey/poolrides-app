import React, { useEffect, useState} from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";   
import { EvilIcons ,Feather , MaterialIcons, Octicons } from '@expo/vector-icons';    

import { AppStyles } from '../../utils/styles';

import CustomButton from "../../components/CustomButton";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import validator from 'validator';

import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';
import { getAuth, updateEmail } from "firebase/auth"

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 

export default function ChangeProfilePic({ navigation }) {

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userUID = authentication.currentUser.uid;

    const getUserData = async () => {
        const userDocReference = doc(db, "users", userUID);
        const userDocSnapshot = await getDoc(userDocReference);
        setUserInfo(userDocSnapshot.data());
        console.log(userInfo);
    }
    getUserData();
}, []);

const uploadPicture = () => {
  // const auth = getAuth();
  // const user = auth.currentUser;
  // if (validator.isEmail(newEmail)) {
  //     reauthenticate().then(() => {
  //         updateEmail(auth.currentUser, newEmail).then(() => {
  //             Alert.alert("Email has been successfully changed");
  //         }).catch((error) => {
  //             Alert.alert(error.message);
  //         });
  //     }).catch((error) => {
  //         Alert.alert(error.message);
  //     })
  // } else {
  //     Alert.alert('Please enter valid email.')
  // }
  // setNewEmail("");
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>

        <View styles={styles.image}>
          {userInfo?.profilePicture == null || item.profilePicture == "" 
          ?
          <EvilIcons name="user" size={150} color="white" />
          :
          <Image source={userInfo?.profilePicture} style={styles.bottomIcons} /> 
          }
        </View>

        <View style={styles.button}>
          <CustomButton
            stretch={true}
            title={"Upload picture"}
            color={AppStyles.color.mint}
            textColor={AppStyles.color.black}
            onPress={uploadPicture}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  image: {

    // marginBottom: '5%'
  },
    inputView: {

      width: AppStyles.textInputWidth.main,
      marginTop: '4%',
      marginBottom: '5%',
      borderBottomWidth: 2,
      borderStyle: 'solid',
      borderColor: AppStyles.color.white,
  },
  button: {
      width: AppStyles.textInputWidth.main,
      marginTop: '4%',
      marginBottom: '5%',
  },
});                