import { ProgressChart } from 'react-native-chart-kit'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { Center } from '../ui/center'
import { Text } from '@/components/ui/text'
import { use$ } from '@legendapp/state/react'
import { progress$ } from '@/store'

export default function DayItem({
  day,
  dayIndexInCalendar,
}: {
  day: number
  dayIndexInCalendar: number
}) {
  const dailyProgress = use$(() => progress$.dailyProgress(dayIndexInCalendar))

  return (
    <Center className='relative flex-1'>
      <ProgressChart
        data={{
          labels: [''],
          data: [dailyProgress / 100],
          colors: [
            `rgb(${
              colors.light[
                dayIndexInCalendar + 1 == day
                  ? '--color-primary-600'
                  : '--color-neutral-300'
              ]
            })`,
          ],
        }}
        width={48}
        height={48}
        strokeWidth={dayIndexInCalendar + 1 == day ? 8 : 4}
        radius={20}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity) =>
            `rgba(${colors.light['--color-neutral-200'].replaceAll(
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
          dayIndexInCalendar + 1 == day ? 'underline text-primary-700' : ''
        }`}
      >
        {dayIndexInCalendar + 1}
      </Text>
    </Center>
  )
}
