import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Startup from './src/screens/Startup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/Signup';
import RiderSignUp from './src/screens/Signup/RiderSignUp';
import DriverSignUp from './src/screens/Signup/DriverSignUp';
import GeneralInterests from './src/screens/Interests/GeneralInterests';
import MusicInterests from './src/screens/Interests/MusicInterests';
import RiderDashboard from './src/screens/Dashboard/RiderDashboard';
import DriverDashboard from './src/screens/Dashboard/DriverDashboard';
import VerifyAccount from './src/screens/Interests/VerifyAccount';
import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from './src/firebase/firebase-config';
import { onIdTokenChanged } from 'firebase/auth';
import { LogBox } from 'react-native'; //THIS IS BAD PRACTICE FOR NOW
import Login from './src/screens/Login'
import RecoverPassword from './src/screens/ForgotPassword/RecoverPassword'
import DriverProfile from './src/screens/Profile/DriverProfile'
import RiderProfile from './src/screens/Profile/RiderProfile';
LogBox.ignoreLogs(['Setting a timer for a long period of time']); //MIGHT IGNORE TIMER ISSUES ON ANDROID
import { Provider } from "react-redux";
import { store } from './store';
import RiderMapView from './src/RiderMapView';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState();
  const [userType, setUserType] = useState();
  const [isGeneralFilled, setIsGeneralFilled] = useState();
  const [isMusicFilled, setIsMusicFilled] = useState();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(authentication, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsEmailVerified(user.emailVerified);
        checkDatabase(user.uid);

      } else {
        setIsLoggedIn(false);
        setIsGeneralFilled(false);
        setIsMusicFilled(false);
      }
    });
    return unsubscribe;
  }, [authentication]);

  async function checkDatabase(userUID) {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    if (userData === undefined) {
      // first time signup so user data is set into database but delayed

      console.log('first time user signup', userType);
      setUserType(undefined);
      setIsGeneralFilled(false);
      setIsMusicFilled(false);
    } else {
      setUserType(userData.usertype);
      setIsGeneralFilled(userData.generalinterests ? true : false);
      setIsMusicFilled(userData.musicinterests ? true : false);
    }
  }

  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          title: '',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerBackVisible: false,
        }}
      >
        <Stack.Screen options={{ headerShown: false }} name="Startup" component={Startup} />
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
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="General Interests" component={GeneralInterests} />
        <Stack.Screen options={{ headerShown: false }} name="Music Interests" component={MusicInterests} />
        <Stack.Screen options={{ headerShown: false }} name="Verify Account" component={VerifyAccount} />
      </Stack.Navigator>
    )
  }

  function AuthDriverStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Driver Dashboard" component={DriverDashboard} />
        <Stack.Screen options={{ headerShown: false }} name="Driver Profile" component={DriverProfile} />
      </Stack.Navigator>
    )
  }

  function AuthRiderStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Rider Dashboard" component={RiderDashboard} />
        <Stack.Screen options={{ headerShown: false }} name="Rider Profile" component={RiderProfile} />
        <Stack.Screen options={{ headerShown: false }} name="Rider Map" component={RiderMapView} />
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

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style='light' />
        {!isLoggedIn && <AuthStack />}
        {isLoggedIn && !(isGeneralFilled && isMusicFilled) && !isEmailVerified && <AuthInterestsStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && (userType === 'Rider' || userType === 'Driver') && !isEmailVerified && <VerifyAccountStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && userType === 'Rider' && isEmailVerified && <AuthRiderStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && userType === 'Driver' && isEmailVerified && <AuthDriverStack />}
      </NavigationContainer>
    </Provider>
  )
}

export default App;
