// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from "firebase/auth/react-native"

// Import API config
import { config } from '../../config';
import { NavigationContainer } from '@react-navigation/native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: "pool-rides-db.firebaseapp.com",
  databaseURL: "https://pool-rides-db-default-rtdb.firebaseio.com",
  projectId: "pool-rides-db",
  storageBucket: "pool-rides-db.appspot.com",
  messagingSenderId: "1073395469457",
  appId: "1:1073395469457:web:76a9d4efc2ed3fd48c4330"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export auth & db to use.
// export const authentication = getAuth(app);
export const db = getFirestore(app);
export const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

