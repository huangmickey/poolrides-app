import React, { useEffect, useState} from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";   
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AppStyles } from '../../utils/styles';

import CustomButton from "../../components/CustomButton";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import validator from 'validator';

import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';
import { getAuth, updateEmail } from "firebase/auth"

export default function ChangeEmail({ navigation }) {

  const [userInfo, setUserInfo] = useState();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const keyboardAppearance = 'dark';
  const maxInputLength = 32;           //Note that the Max length for Phone and Date are fix in the element not global

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

  const changeEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (validator.isEmail(newEmail)) {
        reauthenticate().then(() => {
            updateEmail(auth.currentUser, newEmail).then(() => {
                Alert.alert("Email has been successfully changed");
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
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
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
                      isPassword={true}
                      label={'Current password:'}
                      customShowPasswordComponent={<Icon name={"eye-off-outline"} style={{ color: AppStyles.color.white, fontSize: 25 }} />}
                      customHidePasswordComponent={<Icon name={"eye-outline"} style={{ color: AppStyles.color.white, fontSize: 25 }} />}
                      keyboardAppearance={keyboardAppearance}
                      maxLength={maxInputLength}
                      onChangeText={setCurrentPassword}  
                  />
              </View>
              <View style={styles.button}>
                <CustomButton
                    stretch={true}
                    title={"Change Email"}
                    color={AppStyles.color.mint}
                    textColor={AppStyles.color.black}
                    onPress={changeEmail}
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