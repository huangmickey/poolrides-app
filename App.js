//****************************************************************************//
//****************************************************************************//

import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppStyles } from './src/utils/styles';
import { NavigationContainer } from '@react-navigation/native';
import RiderSignup from './src/feature-or-screens/RiderSignUp';
import Startup from './src/feature-or-screens/Startup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/feature-or-screens/Signup';
import RiderSignUp from './src/feature-or-screens/RiderSignUp';
import RiderLogin from './src/feature-or-screens/RiderLogin';
import DriverLogin from './src/feature-or-screens/DriverLogin';
import {colors} from './src/utils/colors';
//****************************************************************************//
//****************************************************************************//

const Stack =  createNativeStackNavigator();

export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Splash screen is visible while app is fetching resources
  //       await SplashScreen.preventAutoHideAsync();
  //       // Pre-load fonts, make any API calls you need to do here under this comment!!
  //       // Artificial delay (1.5s) for development purposes (remove in deployment)
  //       await new Promise(resolve => setTimeout(resolve, 1500));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

return (
  <>
    <StatusBar style="light"/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Startup" component={Startup} />
        <Stack.Screen options={{ headerShown: false }} name="Sign up" component={Signup} />
        {/* <Stack.Screen name="Driver Sign up" component={DriverSignUp} /> */}
        <Stack.Screen name="Rider Sign up" component={RiderSignUp} />
        <Stack.Screen options={{ headerShown: false }} name="Driver Login" component={DriverLogin} />
        <Stack.Screen options={{ headerShown: false }} name="Rider Login" component={RiderLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  // <View style={styles.container} onLayout={onLayoutRootView}>
  //   <RiderSignup />
  //   <StatusBar style="auto" />
  // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    }
});
