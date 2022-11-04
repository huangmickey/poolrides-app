import * as Location from 'expo-location'

export default async function getGPSLocation() {
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