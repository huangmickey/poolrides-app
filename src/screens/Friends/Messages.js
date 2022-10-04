import React, { useState} from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";                                                               
import { AppStyles, AppIcon } from '../../utils/styles';

import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import { browserLocalPersistence } from 'firebase/auth';

export default function Messages({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{backgroundColor: white}}>This is the Messages's Page</Text>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppStyles.color.black,
    },
});


// https://github.com/FaridSafi/react-native-gifted-chat#readme