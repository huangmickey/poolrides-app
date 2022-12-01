import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { EvilIcons, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { AppStyles, AppIcon } from '../../utils/styles';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from "firebase/auth"
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);
const defaultPicture = AppIcon.images.placeHolder;

export default function AccountSettings({ navigation }) {

  const [DATA] = useState([
    // {
    //   id: 1,
    //   pageName: "Change Username",
    //   pageNavigation: "Change Username",
    // },
    {
      id: 2,
      pageName: "Change Email",
      pageNavigation: "Change Email",
    },
    {
      id: 3,
      pageName: "Change Password",
      pageNavigation: "Change Password",
    },
    {
      id: 4,
      pageName: "Change Phone",
      pageNavigation: "Change Phone",
    },
    {
      id: 5,
      pageName: "Change Profile Picture",
      pageNavigation: "Upload Picture",
    },
    // {
    //   id: 5,
    //   pageName: "Change Profile Picture",
    //   pageNavigation: "Change Profile Picture",
    // },
    {
      id: 6,
      pageName: "Delete Account",
      pageNavigation: "Delete Account",
    },
  ]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  function settingsHandler(item) {
    console.log("We will now navigate to: " + item.pageNavigation)
    navigation.navigate(item.pageNavigation);
  }

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => settingsHandler(item)} style={styles.item}>
      <View style={styles.infoGroup}>
        {item.pageName == "Delete Account"
          ?
          <Text style={styles.deleteAccount}>{item.pageName}</Text>
          :
          <Text style={styles.pageName}>{item.pageName}</Text>
        }
      </View>
      <View style={styles.infoGroup}>
        <MaterialIcons name="keyboard-arrow-right" size={30} color='white' style={styles.infoIcons} />
      </View>
    </TouchableOpacity>
  );

  const reauthenticate = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }

  async function DeleteAccount() {
    console.log('Account is being Deleted')
    setModalVisible(!modalVisible)
    setIsDeletingAccount(false)

    //Add code to delete account here

  }

  async function CancelDeletion() {
    console.log('Account Deletion was canceled')
    setModalVisible(!modalVisible)
    setIsDeletingAccount(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppStyles.color.black,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    marginVertical: 2,
    marginHorizontal: 5,

    backgroundColor: AppStyles.color.black,
    borderColor: AppStyles.color.darkgray,
    borderRadius: 20,
    borderWidth: 1,
  },
  pageName: {
    color: AppStyles.color.platinum,
    justifyContent: 'flex-start',
    fontSize: 16,
  },
  deleteAccount: {
    color: AppStyles.color.salmonred,
    justifyContent: 'flex-start',
    fontSize: 16,
  },
  infoGroup: {
    flexDirection: 'row',
  },
  infoIcons: {
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    height: '25%',
    backgroundColor: AppStyles.color.gray,
    borderRadius: 25,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 5,
  },
  modalText: {
    textAlign: 'justify',
    color: AppStyles.color.black,
    fontWeight: 'bold',
    marginTop: 4
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '12%'
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginLeft: 30,
    marginRight: 30
  },
  buttonAccept: {
    backgroundColor: AppStyles.color.salmonred,
  },
  buttonReject: {
    backgroundColor: AppStyles.color.blue,
  },
  modalButtonText: {
    color: AppStyles.color.platinum,
    fontWeight: 'bold',
    fontSize: 16,
  },
});