import React, { useState} from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";       
import { EvilIcons , AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';                                                         
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, updateDoc } from 'firebase/firestore/lite';
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
        <Text style={styles.pageName}>{item.pageName}</Text>
      </View>
      <View style={styles.infoGroup}>
        <MaterialIcons name="keyboard-arrow-right" size={30} color='white' style={styles.infoIcons}/>
      </View>
    </TouchableOpacity>
  );

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

  infoGroup: {
    flexDirection: 'row',
  },
  infoIcons: {
    justifyContent: 'flex-end',

    marginRight: 15,

  },
});






 

