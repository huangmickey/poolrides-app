import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";                                                              
import { AppStyles, AppIcon } from '../../utils/styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import CustomButton from "../../components/CustomButton";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import validator from 'validator';
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"
import { browserLocalPersistence } from 'firebase/auth';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 
const defaultPicture = AppIcon.images.placeHolder;

export default function ChangeEmail({ navigation }) {

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userUID = authentication.currentUser.uid;
    const getUserData = async () => {
      const userDocReference = doc(db, "users", userUID);
      const userDocSnapshot = await getDoc(userDocReference);
      setUserInfo(userDocSnapshot.data());
    };
    getUserData();
  }, []);

  const reauthenticate = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }
  const changeEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = authentication.currentUser.uid;
    const userDocRef = doc(db, "users", uid);
    if (validator.isEmail(newEmail)) {
      reauthenticate().then(() => {
        updateEmail(auth.currentUser, newEmail).then(() => {
          Alert.alert("Email has been successfully changed");
          updateDoc(userDocRef, {
            email: newEmail,
            });
        }).catch((error) => {
          Alert.alert(error.message);
        });
      }).catch((error) => {
        Alert.alert(error.message);
      })
    } else {
        Alert.alert('Please enter valid email.')
    }
    setNewEmail("");
    setCurrentPassword('');
}
  return (
    <SafeAreaView style={styles.container}>
      {/* {userInfo 
      ?
      <Text style={{color: 'white'}}>The current phone number is {userInfo?.email}</Text>
      :
      <Text style={{color: 'white'}}>The current phone number is Missing</Text>
      } */}
      <View style={{marginTop: '35%'}}>
        <View style={styles.inputView}>
          <FloatingLabelInput
            value={newEmail}
            label={'New email:'}
            onChangeText={setNewEmail}
           
          />
        </View>
        <View style={styles.inputView}>
          <FloatingLabelInput
            value={currentPassword}
            label={'Current password:'}
            onChangeText={setCurrentPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={{alignSelf:'center', marginBottom: '75%', width: '75%', paddingTop: '2%'}}>
         <CustomButton
          stretch={true}
          title={"Submit"}
          color={AppStyles.color.mint}
          textColor={AppStyles.color.black}
          onPress={changeEmail}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: AppStyles.color.black,
    },
    inputView: {
      backgroundColor: AppStyles.color.black,
      borderBottomColor: AppStyles.color.white,
      borderBottomWidth: 1,
      paddingTop: 20,
      height: 64,
      width: '75%',
      alignSelf: 'center',
    },
});