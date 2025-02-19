import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Location from 'expo-location'

type LocationResult = {
  location: Location.LocationObject | null
  region: Location.LocationGeocodedAddress | null
  error: string | null
}

export async function getLocation(): Promise<LocationResult> {
  // Default return in case of errors or permission denial
  let result: LocationResult = {
    location: null,
    region: null,
    error: null,
  }

  if (Platform.OS === 'android' && !Device.isDevice) {
    result.error =
      'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
    return result
  }

  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    result.error = 'Permission to access location was denied'
    return result
  }

  try {
    let location = await Location.getCurrentPositionAsync({})
    result.location = location

    let [region] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })

    if (!region.country && !region.city) {
      result.error = 'Cannot find region'
    } else {
      result.region = region
    }
  } catch (error) {
    result.error = 'Error getting location'
  }

  return result
}
