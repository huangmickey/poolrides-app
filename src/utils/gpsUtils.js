import * as Location from 'expo-location'
import { setLocationPermissionStatus, setDriverLocation } from '../../slices/navSlice';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

export const getLocationPermission = () => {
  const dispatch = useDispatch()

  const askForLocationPermission = async () => {
    let permissionStatus = await Location.requestForegroundPermissionsAsync()
    dispatch(
      setLocationPermissionStatus({
        locationPermissionStatus: permissionStatus
      }))
    if (permissionStatus !== 'granted') {
      // do not let driver go online
      // pop up message saying go to settings to enable location in order to go online
      // disable go online button
    } else if (permissionStatus === 'granted') {
      if (Platform.OS === 'android') {
        permissionStatus = await Location.requestBackgroundPermissionsAsync()
        dispatch(
          setLocationPermissionStatus({
            locationPermissionStatus: permissionStatus
          }))
      }
      if (permissionStatus !== 'granted') {
        // do not let driver go online
        // pop up message saying go to settings to enable location in order to go online
        // disable go online button
      }
    }
  }

  // 1 define the task passing its name and a callback that will be called whenever the location changes
  const startBackgroundLocation = async () => {
    TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      if (locations.length > 0) {
        let location = locations[locations.length - 1];
        if (location.coords) {
          dispatch(
            setDriverLocation({
              driverLocation: location
            }));
        }
      }
    });
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });
    Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
      if (value) {
        Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
      }
    });
  }


  const getGPSLocation = async () => {
    try {
      var location = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
    } catch {
      location = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
    }
    dispatch(
      setDriverLocation({
        driverLocation: location
      }))
  }
  return { askForLocationPermission, getGPSLocation, startBackgroundLocation }
}

//https://stackoverflow.com/questions/34573109/how-to-make-an-android-app-to-always-run-in-background