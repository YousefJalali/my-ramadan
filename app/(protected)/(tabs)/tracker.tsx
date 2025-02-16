import { useState } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { CircleIcon } from '@/components/ui/icon'
import { Center } from '@/components/ui/center'
import { ProgressChart } from 'react-native-chart-kit'
import { Dimensions, ScrollView } from 'react-native'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import Prayers from '@/components/Prayers'
import QuranReading from '@/components/QuranReading'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

const days = new Array(30).fill(0).map((e) => Math.floor(Math.random() * 101))

const WIDTH = Dimensions.get('window').width

const gap = (WIDTH - 48 * 7) / 6

export default function TrackerScreen() {
  const [values, setValues] = useState('2')

  return (
    <VStack className='p-6 mb-0 flex-1 bg-neutral-50'>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        stickyHeaderIndices={[1]}
      >
        <VStack
          className='mt-6'
          style={{ paddingTop: Constants.statusBarHeight }}
        >
          <Heading size='4xl'>Tracker</Heading>
          <Text>Track your progress </Text>
        </VStack>

        <Center>
          <Heading
            className='bg-neutral-50 w-full text-center pb-4'
            style={{ paddingTop: Constants.statusBarHeight }}
          >
            {new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
              day: 'numeric',
              month: 'long',
              calendar: 'islamic',
              year: 'numeric',
            }).format(new Date(`2025-03-${values}`))}
          </Heading>

          <LinearGradient
            colors={[
              `rgb(${colors.light['--color-neutral-50']})`,
              'rgba(255, 255, 255, 0)',
            ]}
            style={{
              height: 24,
              width: '100%',
            }}
          />
        </Center>

        <HStack className='mb-2' style={{ columnGap: gap }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text className='!text-center w-12' key={day}>
              {day}
            </Text>
          ))}
        </HStack>

        <HStack>
          <RadioGroup
            className='flex-row flex-wrap'
            value={values}
            onChange={setValues}
            style={{ columnGap: gap, rowGap: gap }}
          >
            <Center className='w-12' />
            <Center className='w-12' />
            {days.map((e, i, arr) => (
              <Radio
                key={i}
                value={(i + 1).toString()}
                size='md'
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator className='h-12 w-12 border-0 overflow-hidden'>
                  <Center className='relative flex-1 w-full'>
                    <ProgressChart
                      data={{
                        labels: [''],
                        data: [e / 100],
                        colors: [
                          `rgb(${
                            colors.light[
                              (i + 1).toString() === values
                                ? '--color-primary-600'
                                : '--color-neutral-300'
                            ]
                          })`,
                        ],
                      }}
                      width={48}
                      height={48}
                      strokeWidth={(i + 1).toString() === values ? 8 : 4}
                      radius={20}
                      chartConfig={{
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        color: (opacity) =>
                          `rgba(${colors.light[
                            '--color-neutral-200'
                          ].replaceAll(' ', ', ')}, ${opacity})`,
                      }}
                      withCustomBarColorFromData={true}
                      hideLegend
                      style={{
                        position: 'absolute',
                      }}
                    />

                    <Text
                      className={
                        (i + 1).toString() === values
                          ? 'text-primary-600 font-bold'
                          : 'text-neutral-600'
                      }
                    >
                      {i + 1}
                    </Text>
                  </Center>
                </RadioIndicator>
              </Radio>
            ))}
          </RadioGroup>
        </HStack>

        <VStack className='mt-12'>
          <Prayers day={+values} />
        </VStack>

        <VStack className='mt-12'>
          <QuranReading day={+values} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
