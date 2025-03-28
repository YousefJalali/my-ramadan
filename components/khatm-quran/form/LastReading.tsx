import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { HStack } from '@/components/ui/hstack'
import {
  Select,
  SelectIcon,
  SelectInput,
  SelectTrigger,
} from '@/components/ui/select'
import { VStack } from '@/components/ui/vstack'
import { khatmQuran$, QuranJuz } from '@/stores/store'
import { ChevronDownIcon } from 'lucide-react-native'
import { Text } from '@/components/ui/text'

function parseLastReading(data: QuranJuz) {
  return {
    juz: data.juz,
    surah: data.surah[data.surah.length - 1].name_en,
    verse: data.surah[data.surah.length - 1].verses[1].toString(),
  }
}

export default function LastReading() {
  const data: QuranJuz | null = khatmQuran$.lastReading()

  if (!data) {
    return null
  }

  type LastReading = { juz: string; surah: string; verse: string }
  const parsedData: LastReading = parseLastReading(data)

  return (
    <VStack className='mb-6'>
      <Text size='sm'>Last reading</Text>
      <HStack space='lg'>
        {Object.keys(parsedData).map((key) => (
          <FormControl
            key={key}
            isDisabled={true}
            className={`flex-1 ${key !== 'surah' ? 'max-w-20' : ''}`}
          >
            {/* <FormControlLabel>
            <FormControlLabelText className='capitalize flex-1'>
              {key}
            </FormControlLabelText>
          </FormControlLabel> */}
            <Select selectedValue={parsedData[key as keyof LastReading]}>
              <SelectTrigger>
                <SelectInput
                  placeholder='Select option'
                  className='text-sm h-12 px-2 flex-1 capitalize'
                />
                <SelectIcon className='mr-3' as={ChevronDownIcon} />
              </SelectTrigger>
            </Select>
          </FormControl>
        ))}
      </HStack>
    </VStack>
  )
}
