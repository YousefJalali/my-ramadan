import { ProgressChart } from 'react-native-chart-kit'
import { Center } from '../ui/center'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { Dimensions } from 'react-native'
import { HStack } from '../ui/hstack'
import { useEffect, useState } from 'react'
import prayerTime from '@/constants/prayerTime'
import { useLocation } from '@/hooks/useLocation'
import { Icon } from '../ui/icon'
import { MapPin, MapPinned, Navigation } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { isDateBetween } from '@/utils/isDateBetween'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function FastingCountdown({ day }: { day: number }) {
  const [time, setTime] = useState(new Date())
  const [timeline, setTimeline] = useState(50)

  const { error, location } = useLocation()

  const {
    t,
    i18n: { language },
  } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const now = new Date()
    const start = prayerTime[day][0].time
    const end = prayerTime[day][3].time

    if (isDateBetween(now, start, end)) {
      setTimeline((now.getTime() * 50) / new Date(end).getTime())
    }
    // else {
    //   setTimeline(50)
    // }

    return () => {
      clearInterval(interval)
    }
  }, [time])

  const d = {
    labels: [''],
    data: [timeline / 100],
    colors: ['#95ffed'],
  }

  return (
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

      <Center>
        {location.city ? (
          <HStack className='items-center mb-2 gap-1'>
            <Text size='xl' className='text-primary-100'>
              {`${location.city}, ${location.country}`}
            </Text>
            <Icon as={MapPin} size='md' className='text-primary-100' />
          </HStack>
        ) : null}
        <Heading size='3xl' className='text-primary-50'>
          {new Intl.DateTimeFormat(
            language === 'ar-SA' ? 'ar-u-nu-latn' : 'en-US',
            {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }
          ).format(time)}
        </Heading>
      </Center>
    </Center>
  )
}
