import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import { AppStyles } from '../../utils/styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import CustomButton from "../../components/CustomButton";
import validator from 'validator';
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"

export default function ChangePassword({ navigation }) {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const reauthenticate = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }

  const changePassword = () => {
    if (newPassword == 0 || confirmPassword == 0) {
      Alert.alert("Please enter password");
    }
    else if (!validator.isStrongPassword(newPassword)) {
      Alert.alert("Password must be at least 8 characters long with at least one number, capital and special character.");

    }
    else if (newPassword === confirmPassword) {
      reauthenticate().then(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, newPassword).then(() => {
          Alert.alert("Password has been successfully changed");
          setNewPassword("");
          setConfirmPassword("");
          setCurrentPassword("");

        }).catch((error) => {
          Alert.alert(error.message);
          setNewPassword("");
          setConfirmPassword("");
          setCurrentPassword("");
        });
      }).catch((error) => {
        Alert.alert(error.message);
      })

    } else {
      Alert.alert("New and confirmed passwords do not match");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: '30%' }}>
        <View style={styles.inputView}>
          <FloatingLabelInput
            value={newPassword}
            label={'New password:'}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputView}>
          <FloatingLabelInput
            value={confirmPassword}
            label={'Confirm new password:'}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
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
      <View style={{ alignSelf: 'center', marginBottom: '60%', width: '75%', paddingTop: '2%' }}>
        <CustomButton
          stretch={true}
          title={"Submit"}
          color={AppStyles.color.mint}
          textColor={AppStyles.color.black}
          onPress={changePassword}
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