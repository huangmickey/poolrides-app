import { useCallback, useEffect, useState } from 'react'
import { LogBox, View } from 'react-native' //THIS IS BAD PRACTICE FOR NOW

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import DeleteAccount from './src/screens/Settings/DeleteAccount'
import RiderDashboard from './src/screens/Dashboard/RiderDashboard'
import DriverDashboard from './src/screens/Dashboard/DriverDashboard'
import RecoverPassword from './src/screens/ForgotPassword/RecoverPassword'
import DMS from './src/screens/Friends/DMS'
import FriendsList from './src/screens/Friends/FriendsList'
import Messages from './src/screens/Friends/Messages'
import GeneralInterests from './src/screens/Interests/GeneralInterests'
import MusicInterests from './src/screens/Interests/MusicInterests'
import VerifyAccount from './src/screens/Interests/VerifyAccount'
import Login from './src/screens/Login'
import DriverProfile from './src/screens/Profile/DriverProfile'
import RiderProfile from './src/screens/Profile/RiderProfile'
import RiderMapView from './src/screens/RiderMap/RiderMapView'
import Signup from './src/screens/Signup/Signup'
import RiderSignUp from './src/screens/Signup/RiderSignUp'
import DriverSignUp from './src/screens/Signup/DriverSignUp'
import Startup from './src/screens/Startup'
import DriverMap from './src/screens/DriverMap/DriverMap'
import RideRequest from './src/screens/DriverMap/RideRequest'
import RiderRideComplete from './src/screens/RiderMap/RiderRideComplete'

import { authentication, db } from './src/firebase/firebase-config'
import { doc, getDoc } from 'firebase/firestore/lite'
import { onIdTokenChanged } from 'firebase/auth'
import { AppStyles } from './src/utils/styles'
import RideHistory from './src/screens/History/RideHistory'
import Settings from './src/screens/Settings/Settings'
import AccountSettings from './src/screens/Settings/AccountSettings'
import ChangePassword from './src/screens/Settings/ChangePassword'
import ChangePhone from './src/screens/Settings/ChangePhone'
import ChangeEmail from './src/screens/Settings/ChangeEmail'
import ChangeUsername from './src/screens/Settings/ChangeUsername'
import ChangeProfilePic from './src/screens/Settings/ChangeProfilePic'
import SettingsNotifications from './src/screens/Settings/Notifications'
import Privacy from './src/screens/Settings/Privacy'
import Security from './src/screens/Settings/Security'
import Help from './src/screens/Settings/Help'
import About from './src/screens/Settings/About'
import RideSearch from './src/screens/RiderMap/RideSearch'
import RideResults from './src/screens/RiderMap/RideResults'
import { navigationRef } from './RootNavigation'
import * as Notifications from 'expo-notifications'
import { useNotifications } from './src/hooks/useNotifications'
import DriverRideComplete from './src/screens/DriverMap/DriverRideComplete'

LogBox.ignoreLogs(['Setting a timer for a long period of time', "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."])


const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

function AppEntry() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState();
  const [userType, setUserType] = useState();
  const [isGeneralFilled, setIsGeneralFilled] = useState();
  const [isMusicFilled, setIsMusicFilled] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  /**************Prepares application before rendering any pages)***************/
  //While in this state, Application will display a splash screen of the Pool Logo.
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, images, or make any API calls you need to do here
        // console.log("Beginning App Pre-Load");

        // console.log("Running User Authentication");
        // var result = await authenticate();
        // console.log("Authentication was: " + result);

        // var test = await authentication.currentUser.getIdToken();
        // console.log(test);
        // console.log("Pre-Load Complete");

      } catch (e) {
        console.warn(e);
      } finally {
        // console.log("App is ready to Load")
        setAppIsReady(true);

        // authentication.signOut();
      }
    }
    prepare();
  }, []);

  /***********************************************/
  /**************PUSH NOTIFICATIONS***************/
  /***********************************************/
  const { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse, handleReceivedNotification } =
    useNotifications();
  useEffect(() => {
    registerForPushNotificationsAsync()
    Notifications.setNotificationHandler(handleNotification);

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(handleNotificationResponse)
    Notifications.addNotificationReceivedListener(handleReceivedNotification)
    return () => {
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener)
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  function authenticate() {
    checkUser();
    return new Promise(resolve => { setTimeout(() => { resolve('resolved'); }, 2000); });
  }

  function checkUser() {
    onIdTokenChanged(authentication, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsEmailVerified(user.emailVerified);
        checkDatabase(user.uid);
      } else {
        setIsLoggedIn(false);
        setIsEmailVerified(null);
        setUserType(null);
        setIsGeneralFilled(null);
        setIsMusicFilled(null);
      }
    });
  }

  useEffect(() => {
    async function checkUser() {
      try {
        // console.log("Running User Authentication");
        var result = await authenticate();
        // console.log("Authentication was: " + result);
      } catch (e) {
        console.warn(e);
      }
    }
    checkUser();
  }, [authentication]);

  async function checkDatabase(userUID) {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    if (userData === undefined) {
      // first time signup so user data is set into database but delayed
      console.log('first time user signup', userType);
      setUserType(null);
      setIsGeneralFilled(null);
      setIsMusicFilled(null);
    } else {
      setUserType(userData.usertype);
      setIsGeneralFilled(userData.generalinterests ? true : null);
      setIsMusicFilled(userData.musicinterests ? true : null);
    }
  }

  /**************Keeps the Render on the splash screen until app is ready.***************/

  if (!appIsReady) {
    return null;
  }

  /**************Renderers.***************/

  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          title: '',
          headerStyle: {
            backgroundColor: AppStyles.color.black
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Sign up" component={Signup} />
        <Stack.Screen name="Rider Sign up" component={RiderSignUp} />
        <Stack.Screen name="Driver Sign up" component={DriverSignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recover" component={RecoverPassword} />
      </Stack.Navigator>
    )
  }
  function AuthInterestsStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          title: '',
          headerStyle: {
            backgroundColor: AppStyles.color.black
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="General Interests" initialParams={{ returnPage: null, generalInterest: null, musicInterest: null }} component={GeneralInterests} />
        <Stack.Screen name="Music Interests" component={MusicInterests} />
        <Stack.Screen name="Verify Account" component={VerifyAccount} />
      </Stack.Navigator>
    )
  }

  function AuthDriverStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: AppStyles.color.black,
          },
          headerTitleStyle: {
            color: AppStyles.color.platinum,
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackVisible: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen options={{ headerShown: false }} name="Driver Dashboard" component={DriverDashboard} />
        <Stack.Screen options={{ headerShown: false }} name="Driver Profile" component={DriverProfile} />
        <Stack.Screen options={{ headerTitle: "Friends List" }} name="Friends List" component={FriendsList} />
        <Stack.Screen options={{ headerTitle: "Messages" }} name="Messages" component={Messages} />
        <Stack.Screen options={{ headerTitle: "DM's" }} name="DMS" component={DMS} />
        <Stack.Screen name="General Interests" component={GeneralInterests} />
        <Stack.Screen name="Music Interests" component={MusicInterests} />
        <Stack.Screen name="Ride History" component={RideHistory} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Account Settings" component={AccountSettings} />
        <Stack.Screen name="Change Email" component={ChangeEmail} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
        <Stack.Screen name="Change Phone" component={ChangePhone} />
        <Stack.Screen name="Change Username" component={ChangeUsername} />
        <Stack.Screen name="Change Profile Picture" component={ChangeProfilePic} />
        <Stack.Screen name="Notifications" component={SettingsNotifications} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Delete Account" component={DeleteAccount} />
        <Stack.Screen options={{ headerBackButtonMenuEnabled: false, gestureEnabled: false }} name="Driver Map" component={DriverMap} />
        <Stack.Screen options={{ headerBackButtonMenuEnabled: false, gestureEnabled: false }} name="Ride Request" component={RideRequest} />
        <Stack.Screen options={
          {
            headerShown: false,
            headerBackButtonMenuEnabled: false,
            gestureEnabled: false
          }
        } name="RideComplete" component={DriverRideComplete} />
      </Stack.Navigator>
    )
  }

  function AuthRiderStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: AppStyles.color.black,
          },
          headerTitleStyle: {
            color: AppStyles.color.platinum,
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackVisible: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen options={{ headerShown: false }} name="Rider Dashboard" component={RiderDashboard} />
        <Stack.Screen options={{ headerShown: false }} name="Rider Profile" component={RiderProfile} />
        <Stack.Screen options={{ headerShown: false }} name="Rider Map" component={RiderMapView} />
        <Stack.Screen options={{ headerShown: false }} name="Rider Ride Search" component={RideSearch} />
        <Stack.Screen options={{ headerShown: false }} name="Ride Results" component={RideResults} />
        <Stack.Screen options={{ headerTitle: "Friends List" }} name="Friends List" component={FriendsList} />
        <Stack.Screen options={{ headerTitle: "Messages" }} name="Messages" component={Messages} />
        <Stack.Screen options={{ headerTitle: "DM's" }} name="DMS" component={DMS} />
        <Stack.Screen name="General Interests" component={GeneralInterests} />
        <Stack.Screen name="Music Interests" component={MusicInterests} />
        <Stack.Screen name="Ride History" component={RideHistory} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Account Settings" component={AccountSettings} />
        <Stack.Screen name="Change Email" component={ChangeEmail} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
        <Stack.Screen name="Change Phone" component={ChangePhone} />
        <Stack.Screen name="Change Username" component={ChangeUsername} />
        <Stack.Screen name="Change Profile Picture" component={ChangeProfilePic} />
        <Stack.Screen name="Notifications" component={SettingsNotifications} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Delete Account" component={DeleteAccount} />
        <Stack.Screen options={
          {
            headerShown: false,
            headerBackButtonMenuEnabled: false,
            gestureEnabled: false
          }
        } name="RideComplete" component={RiderRideComplete} />
      </Stack.Navigator>
    )
  }

  function VerifyAccountStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Verify Account" component={VerifyAccount} />
      </Stack.Navigator>
    )
  }

  /**************Primary Stack Navigator.***************/
  return (
    <View
      style={{ flex: 1, width: '100%', height: '100%', backgroundColor: AppStyles.color.black }}
      onLayout={onLayoutRootView}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style='light' />
        {!isLoggedIn && <AuthStack />}
        {isLoggedIn && isGeneralFilled == null && isMusicFilled == null && !isEmailVerified && <AuthInterestsStack />}
        {isLoggedIn && isGeneralFilled == true && isMusicFilled == true && !isEmailVerified && <VerifyAccountStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && userType === 'Rider' && isEmailVerified && <AuthRiderStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && userType === 'Driver' && isEmailVerified && <AuthDriverStack />}
      </NavigationContainer>
    </View>
  )
}
export default AppEntry;