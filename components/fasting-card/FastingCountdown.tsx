import useCountdown from '@/hooks/useCountdown'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { useTranslation } from 'react-i18next'
import { formatCountdown } from '@/utils/formatCountdown'
import { ProgressChart } from 'react-native-chart-kit'
import { Center } from '@/components/ui/center'
import { Dimensions } from 'react-native'
import { toMinutes } from '@/utils/toMinutes'
import { mapRange } from '@/utils/mapRange'
import { prayerTimes$ } from '@/store'
import { parsePrayerTime } from '@/utils/parsePrayerTime'
import { use$ } from '@legendapp/state/react'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function FastingCountdown({ day }: { day: number }) {
  const { Fajr, Maghrib } = use$(prayerTimes$.timings[day])

  // console.log(parsePrayerTime(Maghrib))

  const { hours, minutes } = useCountdown(parsePrayerTime(Maghrib))

  const {
    t,
    i18n: { language },
  } = useTranslation()

  //suhur
  const start = toMinutes(parsePrayerTime(Fajr))
  //iftar
  const end = toMinutes(parsePrayerTime(Maghrib))
  const now = hours * 60 + minutes

  const progress = mapRange(now + start, end, start, 0, 50)

  const d = {
    labels: [''],
    data: [progress / 100],
    colors: ['#95ffed'],
  }

  return (
    <Center
      className='relative px-6 w-full justify-end '
      style={{ height: SCREEN_WIDTH / 2 }}
    >
      <ProgressChart
        data={d}
        width={SCREEN_WIDTH - 48}
        height={SCREEN_WIDTH}
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
          top: 16,
          transform: 'rotate(-90deg)',
        }}
      />

      <HStack className='mb-2' space='xs'>
        {hours + minutes > 0 ? (
          <>
            <Text bold className='text-primary-50'>
              {formatCountdown(hours, minutes, language)}
            </Text>
            <Text className='text-primary-100 '>
              {t('left to break fasting')}
            </Text>
          </>
        ) : (
          <Text className='text-primary-50'>
            تقبل الله صيامكم و شهية طيبة ❤️
          </Text>
        )}
      </HStack>
    </Center>
  )
}
