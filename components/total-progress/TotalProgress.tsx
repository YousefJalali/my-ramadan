import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { useTranslation } from 'react-i18next'
import { use$ } from '@legendapp/state/react'
import { progress$ } from '@/stores/store'
import Rings from './Rings'

const unit: { [key: string]: string } = {
  fasting: 'day',
  Prayers: 'prayer',
  'Khatm Quran': 'hizb',
}

// const champions = [
//   'rgb(197 161 51)',
//   'rgb(99 129 39)',P
//   'rgb(255 161 122)',
//   'rgb(86 171 239)',
//   'rgb(173 153 229)',
//   'rgb(241 138 84)',
// ]

const colors: { [key: string]: string } = {
  fasting: 'rgb(197 161 51)',
  Prayers: 'rgb(86 171 239)',
  'Khatm Quran': 'rgb(241 138 84)',
}

export default function TotalProgress() {
  const { t } = useTranslation()

  const { fasting, prayers, quranReading } = use$(() =>
    progress$.totalProgress()
  )

  const data: { [key: string]: number[] } = {
    fasting: [fasting, 30],
    Prayers: [prayers, 5 * 30],
    'Khatm Quran': [quranReading * 2, 60],
  }

  return (
    <HStack className='bg-background-100 rounded-2xl gap-2 items-center'>
      <Rings data={data} colors={Object.values(colors)} />

      <VStack className='gap-4 flex-1'>
        {Object.keys(data).map((key) => (
          <VStack key={key} space='sm'>
            <Text className='capitalize'>{t(key)}</Text>

            <HStack space='sm' className='items-end'>
              <Text
                size='2xl'
                className='leading-none tracking-wider'
                style={{ color: colors[key] }}
              >
                {data[key][0]}/{data[key][1]}
              </Text>

              <Text
                className='uppercase leading-6'
                style={{ color: colors[key] }}
              >
                {t(unit[key])}
              </Text>
            </HStack>
          </VStack>
        ))}
      </VStack>
    </HStack>
  )
}
