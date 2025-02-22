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
import { useTranslation } from 'react-i18next'
import { Heading } from '../ui/heading'
import {
  getCountries,
  insertCountries,
  setupDatabase,
} from '@/sqlite/locationDB'
import { Country } from '@/types'
import CitiesList from './CitiesList'

export default function CountriesList() {
  const { t } = useTranslation()

  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Pick<
    Country,
    'iso2' | 'name' | 'emoji'
  > | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCountries = async (retryCount = 3) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        'https://buwskjtoapwcxnsgsqrs.supabase.co/storage/v1/object/public/countries//countries.json'
      )

      if (!response.ok) throw new Error('Failed to fetch cities')

      const data = await response.json()

      setCountries(data)

      insertCountries(data)
    } catch (error) {
      console.error('Error loading cities:', error)
      setError('Failed to load cities. Please try again.')

      if (retryCount > 0) {
        setTimeout(() => fetchCountries(retryCount - 1), 2000) // Retry after 2 seconds
      }
    } finally {
      setLoading(false)
    }
  }

  async function getCountriesFromDb() {
    try {
      setLoading(true)

      const res = await getCountries()
      if (res?.length === 0) {
        await fetchCountries()
      } else {
        setCountries(res)
      }
    } catch (error) {
      console.error('Error fetching countries from db:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setupDatabase()

    getCountriesFromDb()
  }, [])

  function handleClose() {
    setSelectedCountry(null)
  }

  const handleCountryPress = ({ name, iso2, emoji }: Country) => {
    setSelectedCountry({ name, iso2, emoji })
  }

  return (
    <>
      <SearchableList<Country>
        loading={loading}
        error={error}
        list={countries}
        placeholder={`${t('search country')}...`}
      >
        {({ item, index }) => (
          <Pressable onPress={() => handleCountryPress(item)}>
            <HStack className='py-3' space='sm'>
              <Text>{item.emoji}</Text>
              <Text>{t(item.name)}</Text>
            </HStack>
          </Pressable>
        )}
      </SearchableList>

      {selectedCountry ? (
        <Actionsheet
          isOpen={!!selectedCountry}
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
              <Heading className='my-3' size='2xl'>
                {selectedCountry.name} {selectedCountry.emoji}
              </Heading>
              <CitiesList
                iso2={selectedCountry.iso2}
                handleClose={handleClose}
              />
            </VStack>
          </ActionsheetContent>
        </Actionsheet>
      ) : null}
    </>
  )
}
