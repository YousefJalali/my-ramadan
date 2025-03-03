import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Image } from '@/components/ui/image'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@/utils/formatTime'
import FastingCountdown from './FastingCountdown'
import { Heading } from '@/components/ui/heading'
import DigitalClock from './DigitalClock'
import { settings$, prayerTimes$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Link } from 'expo-router'
import { Icon } from '@/components/ui/icon'
import { MapPin } from 'lucide-react-native'
import { parsePrayerTime } from '@/utils/parsePrayerTime'
import { ExtendedPrayer } from '@/types'

export default function FastingCard({ day }: { day: number }) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const currentLocation = use$(settings$.location)
  const prayers = use$(prayerTimes$.timings[day])

  // console.log(location)

  // const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  // const primaryHex = [
  //   '#f1fcf8',
  //   '#d1f6ea',
  //   '#a2edd7',
  //   '#6bddbf',
  //   '#6bddbf',
  //   '#24a88c',
  //   '#1a8771',
  //   '#196c5d',
  //   '#18574c',
  //   '#194840',
  //   '#082b26',
  // ]
  // const neutralHex = [
  //   '#f4f7f6',
  //   '#e4e9e8',
  //   '#cbd6d4',
  //   '#a7b9b6',
  //   '#7b9591',
  //   '#607a77',
  //   '#526866',
  //   '#475755',
  //   '#3f4b4b',
  //   '#384140',
  //   '#090b0b',
  // ]
  // const neutralHexObj = {
  //   '50': '#f3f8f7',
  //   '100': '#e1ecea',
  //   '200': '#c5dcd8',
  //   '300': '#9ec2bc',
  //   '400': '#6ea29a',
  //   '500': '#538780',
  //   '600': '#477370',
  //   '700': '#3f5f5d',
  //   '800': '#395150',
  //   '900': '#334646',
  //   '950': '#020303',
  // }

  // const hexToRgb = (hex: string) =>
  //   //@ts-ignore
  //   hex
  //     .replace(
  //       /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
  //       (m, r, g, b) => '#' + r + r + g + g + b + b
  //     )
  //     .substring(1)
  //     .match(/.{2}/g)
  //     .map((x) => parseInt(x, 16))

  // function json() {
  //   const res: { [key: string]: number[] } = {}

  //   for (let i = 0; i < shades.length; i++) {
  //     res[shades[i]] = hexToRgb(Object.values(neutralHexObj)[i])
  //     console.log(
  //       `'--color-background-${Object.keys(res)[i]}': '${Object.values(res)[
  //         i
  //       ].join(' ')}',`
  //     )
  //   }

  //   // console.log(res)
  // }

  // console.log(json())

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

      {currentLocation ? (
        <Center className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Link href='/(protected)/settings/location'>
            <HStack
              space='xs'
              className='bg-background-100/20 p-3 py-1 rounded-2xl'
            >
              <Text className='text-typography-200'>{`${currentLocation.city}, ${currentLocation.country}`}</Text>
              <Icon as={MapPin} className='text-typography-200' />
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
              {formatTime(parsePrayerTime(prayers[prayer]))}
            </Text>
          </Center>
        ))}
      </HStack>
    </Center>
  )
}
