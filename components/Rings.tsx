import React from 'react'
import { Dimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

type Props = {
  data: {
    [key: string]: number[]
  }
  colors: string[]
}

const SIZE = Dimensions.get('window').width / 2

export default function Rings({ data, colors }: Props) {
  const values = Object.values(data)
  const d = {
    labels: Object.keys(data), // optional
    data: [
      values[0][0] / values[0][1],
      values[1][0] / values[1][1],
      values[2][0] / values[2][1],
    ],
    colors,
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
