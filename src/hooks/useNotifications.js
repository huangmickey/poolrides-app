import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { setPushToken } from '../../slices/navSlice'



export const useNotifications = () => {
  const dispatch = useDispatch()
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      dispatch(setPushToken({
        pushToken: token
      }))

      console.log('useNotifications.js Push Token === ', token);

    } else {
      dispatch(setPushToken({
        pushToken: '123'
      }))
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const handleNotification = () => {
    console.log('NOTIFICATION RECEIVED')
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  const handleNotificationResponse = response => {
    console.log("NOTIFICATION OPENED")
  };

  const returnToken = response => {
    return globalToken;
  };

  return { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse, returnToken }
}



