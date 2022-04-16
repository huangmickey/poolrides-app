//****************************************************************************//
//****************************************************************************//
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
import MusicPreferences from './src/screens/MusicPreferences';
import RiderDashboard from './src/screens/RiderDashboard';
import EnterEmail from './src/screens/ForgotPassword/EnterEmail';
import VerifyCode from './src/screens/ForgotPassword/VerifyCode';
import NewPasswordPage from './src/screens/ForgotPassword/NewPasswordPage';
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
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Music Preferences" component={MusicPreferences} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Enter Email" component={EnterEmail} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="New Password Page" component={NewPasswordPage} />
      <Stack.Screen options={{ title: '', headerStyle: {backgroundColor: 'black'}}} name="Verify Code" component={VerifyCode} />
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
  return (
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  );
}

export default function App() {
  return (
      <>
        <StatusBar style="light"/>
        <Navigation />
      </>
    );
  }