import { ProgressChart } from 'react-native-chart-kit'
import { Center } from './ui/center'
import { Heading } from './ui/heading'
import { Text } from './ui/text'
import { Dimensions, ImageBackground } from 'react-native'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Image } from './ui/image'
import { useEffect, useState } from 'react'
import prayerTime from '@/constants/prayerTime'
import { timeStrToMilitaryTime } from '@/utils/timeStrToMilitaryTime'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function FastingTimeline() {
  const [time, setTime] = useState(new Date())
  const [timeline, setTimeline] = useState(0)

  const imsak = timeStrToMilitaryTime(prayerTime[0][0].time)
  const iftar = timeStrToMilitaryTime(prayerTime[0][3].time)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date()
      setTime(newTime)
    }, 1000)

    const now = +`${time.getHours()}${time.getMinutes()}`

    if (now < iftar && now > imsak) setTimeline((now * 50) / iftar)
    if (timeline < 50 && now > iftar) setTimeline(50)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  const d = {
    labels: [''],
    data: [timeline / 100],
    colors: ['rgb(241 252 248)'],
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const primaryHex = [
    '#f1fcf8',
    '#d1f6ea',
    '#a2edd7',
    '#6bddbf',
    '#6bddbf',
    '#24a88c',
    '#1a8771',
    '#196c5d',
    '#18574c',
    '#194840',
    '#082b26',
  ]
  const neutralHex = [
    '#f4f7f6',
    '#e4e9e8',
    '#cbd6d4',
    '#a7b9b6',
    '#7b9591',
    '#607a77',
    '#526866',
    '#475755',
    '#3f4b4b',
    '#384140',
    '#090b0b',
  ]
  const neutralHexObj = {
    '50': '#f3f8f7',
    '100': '#e1ecea',
    '200': '#c5dcd8',
    '300': '#9ec2bc',
    '400': '#6ea29a',
    '500': '#538780',
    '600': '#477370',
    '700': '#3f5f5d',
    '800': '#395150',
    '900': '#334646',
    '950': '#020303',
  }

  const hexToRgb = (hex: string) =>
    //@ts-ignore
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16))

  function json() {
    const res: { [key: string]: number[] } = {}

    for (let i = 0; i < shades.length; i++) {
      res[shades[i]] = hexToRgb(Object.values(neutralHexObj)[i])
      console.log(
        `'--color-neutral-${Object.keys(res)[i]}': '${Object.values(res)[
          i
        ].join(' ')}',`
      )
    }

    // console.log(res)
  }

  // console.log(json())

  return (
    <Center className='relative h-full'>
      {/* <Image
        source={require('../assets/images/ramadan.png')}
        alt='Logo'
        size='none'
        resizeMode='cover'
        className='absolute bottom-0 h-full opacity-50 mix-blend-overlay'
      /> */}
      <Center
        className='relative px-6 w-full overflow-hidden justify-end'
        style={{ height: SCREEN_WIDTH / 2 }}
      >
        <ProgressChart
          data={d}
          width={SCREEN_WIDTH - 48}
          height={SCREEN_WIDTH - 32}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: () => `rgba(0, 0, 0, 0)`,
            style: {
              borderRadius: 16,
            },
          }}
          withCustomBarColorFromData={true}
          hideLegend
          radius={(SCREEN_WIDTH - 72) / 2}
          strokeWidth={24}
          style={{
            position: 'absolute',
            top: 4,
            transform: 'rotate(-90deg)',
          }}
        />

        <Center className='my-8.5 bg-[url(../assets/images/partial-react-logo.png)]'>
          <Text size='xl' className='mb-2 text-primary-50'>
            Dhuhr
          </Text>
          <Heading size='3xl' className='text-primary-50'>
            {time.toLocaleTimeString()}
          </Heading>
          <Text className='text-primary-200'>Next prayer in 01:31:44</Text>
        </Center>
      </Center>

      <HStack className='justify-between w-full mt-1 px-6'>
        <VStack>
          <Text size='lg' bold className='text-primary-50'>
            Fajr
          </Text>
          <Text className='text-primary-100'>{prayerTime[0][0].time} AM</Text>
        </VStack>

        <VStack className='items-end'>
          <Text size='lg' bold className='text-primary-50'>
            Iftar
          </Text>
          <Text className='text-primary-100'>{prayerTime[0][3].time} PM</Text>
        </VStack>
      </HStack>
    </Center>
  )
}
