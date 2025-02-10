import React from 'react'
import { Dimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

type Props = {
  data: {
    [key: string]: number[]
  }
}

const SIZE = Dimensions.get('window').width / 2

export default function Rings({ data }: Props) {
  const values = Object.values(data)
  const d = {
    labels: Object.keys(data), // optional
    data: [
      values[0][0] / values[0][1],
      values[1][0] / values[1][1],
      values[2][0] / values[2][1],
    ],
    colors: ['rgb(255 161 122)', 'rgb(86 171 239)', 'rgb(173 153 229)'],
  }

  return (
    <ProgressChart
      data={d}
      width={SIZE}
      height={SIZE}
      chartConfig={{
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
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
