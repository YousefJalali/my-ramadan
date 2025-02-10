import { Platform } from 'react-native'
import { useState, useEffect } from 'react'
import * as Device from 'expo-device'
import * as Location from 'expo-location'

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [region, setRegion] = useState<Location.LocationGeocodedAddress | null>(
    null
  )

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setError(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        )
        return
      }
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)

      let [rg] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      if (!rg) {
        setError('cant find region')
        return
      } else {
        setRegion(rg)
      }
    }

    getCurrentLocation()
  }, [])

  return {
    location: { ...region, ...location },
    error,
  }
}
