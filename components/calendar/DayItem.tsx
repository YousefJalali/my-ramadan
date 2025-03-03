import { ProgressChart } from 'react-native-chart-kit'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { use$ } from '@legendapp/state/react'
import { progress$ } from '@/store'
import useColors from '@/hooks/useColors'

export default function DayItem({
  day,
  dayInCalendar,
}: {
  day: number
  dayInCalendar: number
}) {
  const colors = useColors()
  const dailyProgress = use$(() => progress$.dailyProgress(dayInCalendar))

  return (
    <Center className='relative flex-1'>
      <ProgressChart
        data={{
          labels: [''],
          data: [dailyProgress / 100],
          colors: [
            `rgb(${
              colors[
                dayInCalendar == day
                  ? '--color-primary-600'
                  : '--color-neutral-300'
              ]
            })`,
          ],
        }}
        width={48}
        height={48}
        strokeWidth={dayInCalendar == day ? 8 : 4}
        radius={20}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity) =>
            `rgba(${colors['--color-neutral-200'].replaceAll(
              ' ',
              ', '
            )}, ${opacity})`,
        }}
        withCustomBarColorFromData={true}
        hideLegend
        style={{
          position: 'absolute',
        }}
      />

      <Text
        className={`!font-roboto text-neutral-500 ${
          dayInCalendar == day ? 'underline text-primary-700' : ''
        }`}
      >
        {dayInCalendar}
      </Text>
    </Center>
  )
}
