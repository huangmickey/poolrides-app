//****************************************************************************//
//****************************************************************************//

import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Startup from './src/screens/Startup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/Signup';
import RiderSignUp from './src/screens/signup/RiderSignUp';
import DriverSignUp from './src/screens/signup/DriverSignUp';
import RiderLogin from './src/screens/login/RiderLogin';
import DriverLogin from './src/screens/login/DriverLogin';
import GeneralPreferences from './src/screens/GeneralPreferences';
import AuthContextProvider, { AuthContext } from './src/services/auth-context';
import RiderDashboard from './src/screens/RiderDashboard';

//****************************************************************************//
//****************************************************************************//
const Stack =  createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Startup" component={Startup} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Sign up" component={Signup} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Rider Sign up" component={RiderSignUp} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Driver Sign up" component={DriverSignUp} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Driver Login" component={DriverLogin} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Rider Login" component={RiderLogin} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="General Preferences" component={GeneralPreferences} />
    </Stack.Navigator>
  )
}

function AuthenticatedRiderStack() {
  return (
    <Stack.Navigator>
      <RiderDashboard />
    </Stack.Navigator>
  );
}

function AuthenticatedDriverStack() {
  return (
    <Stack.Navigator>
      
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <AuthStack/>
      {/* {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedRiderStack />} */}
      
    </NavigationContainer>
  );
}

export default function App() {
  return (
    
      <>
        <StatusBar style="light"/>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
            {/* <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Startup" component={Startup} />
                <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Sign up" component={Signup} />
                <Stack.Screen name="Driver Sign up" component={DriverSignUp} />
                <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}}  name="Rider Sign up" component={RiderSignUp} />
                <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Driver Login" component={DriverLogin} />
                <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Rider Login" component={RiderLogin} />
                <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="General Preferences" component={GeneralPreferences} />

              </Stack.Navigator>
            </NavigationContainer> */}
      </>
    );
  }
