import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Startup from './src/screens/Startup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/Signup';
import RiderSignUp from './src/screens/signup/RiderSignUp';
import DriverSignUp from './src/screens/signup/DriverSignUp';
import Login from './src/screens/Login';
import GeneralInterests from './src/screens/interests/GeneralInterests';
import MusicInterests from './src/screens/interests/MusicInterests';
import RiderDashboard from './src/screens/dashboard/RiderDashboard';
import DriverDashboard from './src/screens/dashboard/DriverDashboard';

import VerifyAccount from './src/screens/interests/VerifyAccount';
import ForgotPWordEmail from './src/screens/ForgotPassword/ForgotPWordEmail';
import { doc, getDoc, onSnapshot } from 'firebase/firestore/lite';
import { onAuthStateChanged } from "firebase/auth";
import { authentication, db } from './src/firebase/firebase-config';
import { AppStyles } from './src/utils/styles';
import { onIdTokenChanged } from 'firebase/auth';

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
      console.log('OnAuthStateChanged => Here is the information',
        userData.usertype,
        userData.generalinterests,
        userData.musicinterests
      );
      setUserType(userData.usertype);
      setIsGeneralFilled(userData.generalinterests ? true : false);
      setIsMusicFilled(userData.musicinterests ? true : false);
    }
  }

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Startup" component={Startup} />
        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Sign up" component={Signup} />
        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Rider Sign up" component={RiderSignUp} />
        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Driver Sign up" component={DriverSignUp} />
        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Driver Login" component={DriverLogin} />
        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Rider Login" component={RiderLogin} />
        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Forgot Pword" component={ForgotPWordEmail} />



        <Stack.Screen options={{ title: '', headerStyle: { backgroundColor: 'black' } }} name="Verify Account" component={VerifyAccount} />
      </Stack.Navigator >
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
      </Stack.Navigator>
    )
  }

  function AuthRiderStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Rider Dashboard" component={RiderDashboard} />
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
  //comment body out
  return (
    <>
      <NavigationContainer style={{ backgroundColor: AppStyles.color.black }}>
        {!isLoggedIn && <AuthStack />}
        {isLoggedIn && !(isGeneralFilled && isMusicFilled) && !isEmailVerified && <AuthInterestsStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && (userType === 'Rider' || userType === 'Driver') && !isEmailVerified && <VerifyAccountStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && userType === 'Rider' && isEmailVerified && <AuthRiderStack />}
        {isLoggedIn && isGeneralFilled && isMusicFilled && userType === 'Driver' && isEmailVerified && <AuthDriverStack />}
      </NavigationContainer>
    </>
  )
}

export default App;
