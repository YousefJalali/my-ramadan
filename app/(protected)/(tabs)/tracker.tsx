import { ReactNode, useState } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Center } from '@/components/ui/center'
import { ScrollView } from 'react-native'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import Prayers from '@/components/Prayers'
import QuranReading from '@/components/QuranReading'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { Button, ButtonText } from '@/components/ui/button'
import Fasting from '@/components/Fasting'
import { TFunction } from 'i18next'
import Calendar from '@/components/calendar/Calendar'

function Wrapper({
  t,
  title,
  children,
}: {
  t: TFunction<'translation', undefined>
  title: string
  children: ReactNode
}) {
  return (
    <VStack className='mt-16'>
      <HStack className='mb-3 justify-between'>
        <Heading size='2xl'>{t(title)}</Heading>
        <Button variant='link'>
          <ButtonText>{t('edit')}</ButtonText>
        </Button>
      </HStack>
      {children}
    </VStack>
  )
}

export default function TrackerScreen() {
  const [dayIndex, setDayIndex] = useState(1)
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <VStack className='px-6 mb-0 flex-1 bg-neutral-50'>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        stickyHeaderIndices={[1]}
      >
        <VStack
          className='mt-8'
          style={{ paddingTop: Constants.statusBarHeight }}
        >
          <Heading size='4xl'>Tracker</Heading>
          <Text>Track your progress </Text>
        </VStack>

        <Center>
          <Heading
            className='bg-neutral-50 w-full pb-4'
            style={{ paddingTop: Constants.statusBarHeight + 16 }}
          >
            {new Intl.DateTimeFormat(
              language === 'ar-SA'
                ? 'ar-TN-u-ca-islamic'
                : 'en-US-u-ca-islamic',
              {
                day: 'numeric',
                month: 'long',
                calendar: 'islamic',
                year: 'numeric',
              }
            ).format(new Date(`2025-03-${dayIndex + 1}`))}
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

        <Calendar dayIndex={dayIndex} setDayIndex={setDayIndex} />

        <Wrapper t={t} title='fasting'>
          <Fasting dayIndex={dayIndex} trackerView readOnly />
        </Wrapper>

        <Wrapper t={t} title='Prayers'>
          <Prayers dayIndex={dayIndex} trackerView readOnly />
        </Wrapper>

        <Wrapper t={t} title='Quran Reading'>
          <QuranReading dayIndex={dayIndex} trackerView readOnly />
        </Wrapper>
      </ScrollView>
    </VStack>
  )
}
