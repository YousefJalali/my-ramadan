import React from 'react'
import { Dimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

type Props = {
  total: number[]
  daily: number[]
  quran: number[]
}

const SIZE = Dimensions.get('window').width / 2

export default function Rings({ total, daily, quran }: Props) {
  const data = {
    labels: ['Total', 'Daily', 'Quran'], // optional
    data: [total[0] / total[1], daily[0] / daily[1], quran[0] / quran[1]],
    colors: [
      'rgba(255, 0, 0,0.5)',
      'rgba(238, 130, 238,0.6)',
      'rgba(106, 90, 205,0.5)',
    ],
  }

  return (
    <ProgressChart
      data={data}
      width={SIZE}
      height={SIZE}
      chartConfig={{
        backgroundGradientFrom: 'transparent',
        backgroundGradientTo: 'transparent',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      withCustomBarColorFromData={true}
      hideLegend
    />
  )
}
