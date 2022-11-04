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
        pushToken: token
      }))

      // console.log('useNotifications.js Push Token === ', token);

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
    // 20s timer to dismiss notification
    await timeout(20000)
    await Notifications.dismissAllNotificationsAsync();

  };

  const handleNotificationResponse = async response => {
    console.log("NOTIFICATION CLICKED")
    // Navigate to new page => show notification data as UI and show accept/reject button
    // If the driver accepts the ride request, make a post request to the server which will set the rides "isAccepted" to true, and add the driversuserID, and driverPushToken to the entry
    // Use the rideDoc located on line 98 of index.js in the backend.  This is the exact document to update.
    let notificationData = response.notification.request.content.data
    // console.log(notificationData)
    // console.log(RootNavigation.navigationRef.current.getRootState())
    RootNavigation.navigate('Driver Map', { notificationData: notificationData })
  };

  return { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse, handleReceivedNotification }
}


function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}
