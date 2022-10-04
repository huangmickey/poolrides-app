import React, { useState} from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                               
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

export default function ChangePassword({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: 'white'}}>This is the Password's Page</Text>
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
});