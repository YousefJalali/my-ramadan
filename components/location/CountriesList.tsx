import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { useEffect, useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet'
import { Pressable } from '@/components/ui/pressable'
import SearchableList from '@/components/SearchableList'
import { settings$ } from '@/store'

const item = {
  id: 1,
  name: 'Afghanistan',
  iso3: 'AFG',
  iso2: 'AF',
  numeric_code: '004',
  phonecode: '93',
  capital: 'Kabul',
  currency: 'AFN',
  currency_name: 'Afghan afghani',
  currency_symbol: '؋',
  tld: '.af',
  native: 'افغانستان',
  region: 'Asia',
  region_id: 3,
  subregion: 'Southern Asia',
  subregion_id: 14,
  nationality: 'Afghan',
  timezones: [
    {
      zoneName: 'Asia/Kabul',
      gmtOffset: 16200,
      gmtOffsetName: 'UTC+04:30',
      abbreviation: 'AFT',
      tzName: 'Afghanistan Time',
    },
  ],
  translations: {
    ko: '아프가니스탄',
    'pt-BR': 'Afeganistão',
  },
  latitude: '33.00000000',
  longitude: '65.00000000',
  emoji: '🇦🇫',
  emojiU: 'U+1F1E6 U+1F1EB',
  cities: [
    {
      id: 141,
      name: '‘Alāqahdārī Dīshū',
      latitude: '30.43206000',
      longitude: '63.29802000',
    },
  ],
}

type Country = typeof item
type City = (typeof item.cities)[0]

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([])
  const [country, setCountry] = useState<Country | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCities = async (retryCount = 3) => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bcities.json'
        )

        if (!response.ok) throw new Error('Failed to fetch cities')

        const data = await response.json()
        setCountries(data)
      } catch (error) {
        console.error('Error loading cities:', error)
        setError('Failed to load cities. Please try again.')

        if (retryCount > 0) {
          setTimeout(() => loadCities(retryCount - 1), 2000) // Retry after 2 seconds
        }
      } finally {
        setLoading(false)
      }
    }

    loadCities()
  }, [])

  function handleClose() {
    setCountry(null)
  }

  function handleCityPress({ name, longitude, latitude }: City) {
    if (!country) return

    settings$.location.set({
      country: country.name,
      city: name,
      longitude: +longitude,
      latitude: +latitude,
    })

    handleClose()
  }

  return (
    <>
      <SearchableList<Country>
        loading={loading}
        error={error}
        list={countries}
        placeholder='Search Country...'
      >
        {({ item, index }) => (
          <Pressable onPress={() => setCountry(item)}>
            <HStack className='py-3' space='sm'>
              <Text>{item.emoji}</Text>
              <Text>{item.name}</Text>
            </HStack>
          </Pressable>
        )}
      </SearchableList>

      {country ? (
        <Actionsheet
          isOpen={!!country}
          onClose={handleClose}
          snapPoints={[90]}
          className=''
        >
          <ActionsheetBackdrop />

          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

            <VStack className='flex-1 h-full w-full'>
              <SearchableList<City>
                loading={false}
                error=''
                list={country.cities}
                placeholder='Search City...'
              >
                {({ item, index }) => (
                  <Pressable onPress={() => handleCityPress(item)}>
                    <Text className='py-3'>{item.name}</Text>
                  </Pressable>
                )}
              </SearchableList>
            </VStack>
          </ActionsheetContent>
        </Actionsheet>
      ) : null}
    </>
  )
}
