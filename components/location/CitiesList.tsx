import { City } from '@/types/types'
import SearchableList from '../SearchableList'
import { useEffect, useState } from 'react'
import { settings$ } from '@/stores/store'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { useTranslation } from 'react-i18next'
import { getCitiesByCountry, insertCities } from '@/sqlite/locationDB'
import Bugsnag from '@bugsnag/expo'

export default function CitiesList({
  countryName,
  countryNameAr,
  iso2,
  flag,
  handleClose,
}: {
  countryName: string
  countryNameAr: string
  iso2: string
  flag: string
  handleClose: () => void
}) {
  const { t } = useTranslation()
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCities = async (retryCount = 3) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cities//${iso2}.json`
      )

      if (!response.ok) throw new Error(`Failed to fetch cities [${iso2}]`)

      const data = await response.json()

      setCities(data)

      insertCities(data)
    } catch (error) {
      if (retryCount > 0) {
        setTimeout(() => fetchCities(retryCount - 1), 2000) // Retry after 2 seconds
      }

      console.error('Error loading cities:', error)
      Bugsnag.notify(error as Error)
      setError('Failed to load cities. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function getCitiesFromDb() {
    try {
      setLoading(true)

      const res = await getCitiesByCountry(iso2)
      if (res?.length === 0) {
        await fetchCities()
      } else {
        setCities(res)
      }
    } catch (error) {
      Bugsnag.notify(error as Error)
      console.error('Error fetching cities from db:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCitiesFromDb()
  }, [iso2])

  function handleCityPress({ name, longitude, latitude }: City) {
    if (!iso2) return

    settings$.location.change({
      country: countryName,
      country_ar: countryNameAr,
      city: name,
      longitude: +longitude,
      latitude: +latitude,
      iso2,
      flag,
    })

    handleClose()
  }

  return (
    <SearchableList<City>
      loading={loading}
      error={error}
      list={cities}
      placeholder={`${t('search city')}...`}
    >
      {({ item, index }) => (
        <Pressable onPress={() => handleCityPress(item)}>
          <Text className='py-3'>{item.name}</Text>
        </Pressable>
      )}
    </SearchableList>
  )
}
