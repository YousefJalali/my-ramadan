import { VStack } from '@/components/ui/vstack'
import CurrentLocation from '@/components/location/CurrentLocation'
import CountriesList from '@/components/location/CountriesList'

export default function Location() {
  return (
    <VStack className='flex-1'>
      <CurrentLocation />

      <CountriesList />
    </VStack>
  )
}
