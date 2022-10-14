import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                              
import { AppStyles, AppIcon } from '../../utils/styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import CustomButton from "../../components/CustomButton";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from "firebase/auth"

import { doc, getDoc, updateDoc,deleteDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';
import { Alert } from 'react-native';


export default function DeleteAccount({ navigation }) {

    const [userInfo, setUserInfo] = useState();
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
    const deleteAccount = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userUID = authentication.currentUser.uid;
        reauthenticate().then(() => {
            deleteUser(user).then(() => {
                Alert.alert("Your account has been deleted")
                deleteDoc(doc(db, "users", userUID));
            }).catch((error) => {
                Alert.alert(error.message);
            });
        }).catch((error) => {
            Alert.alert(error.message);
        })
        setCurrentPassword("");
    }
  
    return (
      <SafeAreaView style={styles.container}>
         <View style={{marginTop: '35%'}}>
          
            <Text style={{ color: AppStyles.color.white, marginBottom: 30, alignSelf:'center', fontSize: 20, width: '70%' }}>Are you sure you want to delete your account?</Text>
         
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
            title={"Delete Account"}
            color={AppStyles.color.mint}
            textColor={AppStyles.color.black}
            onPress={deleteAccount}
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