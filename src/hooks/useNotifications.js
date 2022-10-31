import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { setPushToken } from '../../slices/navSlice'
import * as RootNavigation from '../../RootNavigation.js';

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
        riderPushToken: token
      }))

      // console.log('useNotifications.js Push Token === ', token);

    } else {
      dispatch(setPushToken({
        riderPushToken: '123'
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

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  const handleReceivedNotification = async response => {
    console.log("NOTIFICATION RECEIVED")
    await Notifications.dismissAllNotificationsAsync();
  };

  const handleNotificationResponse = async response => {

    let now = new Date()
    let receivedUTC = response.notification.date
    let received = new Date(0)
    received.setUTCSeconds(receivedUTC)


    let differenceInSeconds = (now - received) / 1000

    console.log("NOTIFICATION OPENED")

    let notificationData = response.notification.request.content.data
    console.log(notificationData)

    if (differenceInSeconds - 1 <= 15) {
      console.log('opened notification in roughly less than 15s')
      // accepted ride:
      // navigate to screen
      // create new ride in db
      console.log(RootNavigation.navigationRef.current.getRootState())
      // RootNavigation.navigate('ChatScreen', { userName: 'Lucy' });
    } else {
      console.log('took roughly greater than 15s to open notification')
    }



  };

  return { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse, handleReceivedNotification }
}



