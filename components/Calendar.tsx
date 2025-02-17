import { Dispatch, SetStateAction } from 'react'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Radio, RadioGroup, RadioIndicator } from '@/components/ui/radio'
import { Center } from '@/components/ui/center'
import { ProgressChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { useTranslation } from 'react-i18next'

const days = new Array(30).fill(0).map((e) => Math.floor(Math.random() * 101))

const WIDTH = Dimensions.get('window').width

const gap = (WIDTH - 48 * 7) / 6

const calendarDays: { [key: string]: string[] } = {
  'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'ar-SA': [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
}

export default function Calendar({
  day,
  setDay,
}: {
  day: number
  setDay: Dispatch<SetStateAction<number>>
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <>
      <HStack className='mb-2' style={{ columnGap: gap }}>
        {calendarDays[language].map((day) => (
          <Text
            size={language === 'ar-SA' ? 'xs' : 'lg'}
            className='!text-center w-12'
            key={day}
          >
            {day}
          </Text>
        ))}
      </HStack>

      <HStack>
        <RadioGroup
          className='flex-row flex-wrap'
          value={'' + day}
          onChange={setDay}
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
                <Center className='relative flex-1'>
                  <ProgressChart
                    data={{
                      labels: [''],
                      data: [e / 100],
                      colors: [
                        `rgb(${
                          colors.light[
                            i + 1 == day
                              ? '--color-primary-600'
                              : '--color-neutral-300'
                          ]
                        })`,
                      ],
                    }}
                    width={48}
                    height={48}
                    strokeWidth={i + 1 == day ? 8 : 4}
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
                      i + 1 == day ? 'underline text-primary-700' : ''
                    }`}
                  >
                    {i + 1}
                  </Text>
                </Center>
              </RadioIndicator>
            </Radio>
          ))}
        </RadioGroup>
      </HStack>
    </>
  )
}
