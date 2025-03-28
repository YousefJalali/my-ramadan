import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Image } from '@/components/ui/image'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@/utils/formatTime'
import FastingCountdown from './FastingCountdown'
import { Heading } from '@/components/ui/heading'
import DigitalClock from './DigitalClock'
import { prayerTimes$, settings$ } from '@/stores/store'
import { use$ } from '@legendapp/state/react'
import { Link } from 'expo-router'
import { Icon } from '@/components/ui/icon'
import { MapPin } from 'lucide-react-native'
import { ExtendedPrayer } from '@/types/types'

export default function FastingCard({ day }: { day: number }) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const location = use$(settings$.location)
  const prayerTimes = use$(() => prayerTimes$.getDayParsedPrayerTimes(day))

  return (
    <Center className='relative h-full'>
      <Image
        source={require('@/assets/images/ramadan2.png')}
        alt='Logo'
        size='none'
        resizeMode='cover'
        className='absolute bottom-0 h-[150%] opacity-10 mix-blend-multiply'
      />

      <FastingCountdown day={day} />

      {location.current ? (
        <Center className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Link href='/(protected)/settings/location'>
            <HStack space='xs' className='p-2 rounded-2xl'>
              <Text className='text-typography-100 dark:text-typography-900'>{`${location.current.city}, ${location.current.country}`}</Text>
              <Icon
                as={MapPin}
                className='text-typography-100 dark:text-typography-900'
              />
            </HStack>
          </Link>
        </Center>
      ) : null}

      <Center>
        <Heading size='3xl' className='text-primary-50'>
          <DigitalClock />
        </Heading>
      </Center>

      <HStack
        className={`justify-between w-full px-5 ${
          language === 'ar-SA' ? 'flex-row-reverse' : ''
        }`}
      >
        {[
          { prayer: 'Imsak' as ExtendedPrayer, label: 'imsak' },
          { prayer: 'Maghrib' as ExtendedPrayer, label: 'Iftar' },
        ].map(({ prayer, label }) => (
          <Center key={prayer}>
            <Text size='lg' bold className='text-primary-50'>
              {t(label)}
            </Text>
            <Text className='text-primary-100'>
              {formatTime(prayerTimes[prayer].toJSDate())}
            </Text>
          </Center>
        ))}
      </HStack>
    </Center>
  )
}
