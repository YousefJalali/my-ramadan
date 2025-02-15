import { Center } from '../ui/center'
import { Text } from '../ui/text'
import { HStack } from '../ui/hstack'
import { Image } from '../ui/image'
import prayerTime from '@/constants/prayerTime'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@/utils/formatTime'
import PrayerCountdown from './PrayerCountdown'
import FastingCountdown from './FastingCountdown'

export default function FastingTimeline({ day }: { day: number }) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

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
  //       `'--color-neutral-${Object.keys(res)[i]}': '${Object.values(res)[
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
      <PrayerCountdown day={day} />

      <HStack
        className={`justify-between w-full px-5 ${
          language === 'ar-SA' ? 'flex-row-reverse' : ''
        }`}
      >
        {[
          { prayer: 'Suhur', prayerIndex: 0 },
          { prayer: 'Iftar', prayerIndex: 3 },
        ].map(({ prayer, prayerIndex }, i) => (
          <Center key={prayer}>
            <Text size='lg' bold className='text-primary-50'>
              {t(prayer)}
            </Text>
            <Text className='text-primary-100'>
              {formatTime(prayerTime[day][prayerIndex].time)}
            </Text>
          </Center>
        ))}
      </HStack>
    </Center>
  )
}
