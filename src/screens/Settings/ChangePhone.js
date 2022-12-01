import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { AppStyles } from '../../utils/styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import CustomButton from "../../components/CustomButton";
import validator from 'validator';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"

import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { Alert } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function ChangePhone({ navigation }) {

  const [userInfo, setUserInfo] = useState();
  const [newPhone, setNewPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

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

  const changePhone = () => {
    const uid = authentication.currentUser.uid;
    const userDocRef = doc(db, "users", uid);
    if (newPhone == "" || newPhone == !validator.isMobilePhone) {
      Alert.alert("Please, enter valid phone number");
    }
    else {
      reauthenticate().then(() => {
        updateDoc(userDocRef, {
          phone: newPhone,
        });
        Alert.alert("Phone number has been successfully changed");
        setNewPhone('');
        setCurrentPassword('');
        navigation.navigate("Account Settings");
      }).catch((error) => {
        Alert.alert(error.message);
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: '35%' }}>
        <View style={styles.inputView}>
          <FloatingLabelInput
            value={newPhone}
            label={'New phone Number:'}
            maskType={'phone'}
            mask={'(999) 999-9999'}
            hint={'(555) 555-5555'}
            keyboardType='numeric'
            maxLength={14}
            blurOnSubmit={false}
            onChangeText={setNewPhone}
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
      <View style={{ alignSelf: 'center', marginBottom: '75%', width: '75%', paddingTop: '2%' }}>
        <CustomButton
          stretch={true}
          title={"Submit"}
          color={AppStyles.color.mint}
          textColor={AppStyles.color.black}
          onPress={changePhone}
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