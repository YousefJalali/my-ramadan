import { ReactNode, useState } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Center } from '@/components/ui/center'
import { ScrollView } from 'react-native'
import Prayers from '@/components/Prayers'
import KhatmQuran from '@/components/khatm-quran/KhatmQuran'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { Button, ButtonText } from '@/components/ui/button'
import Fasting from '@/components/Fasting'
import Calendar from '@/components/calendar/Calendar'
import { use$, useObservable } from '@legendapp/state/react'
import useColors from '@/hooks/useColors'

function Wrapper({
  title,
  children,
  showEditBtn = true,
}: {
  title: string
  children: (readonly: boolean) => ReactNode
  showEditBtn?: boolean
}) {
  const readonly$ = useObservable(true)
  const readonly = use$(readonly$)
  const { t } = useTranslation()

  return (
    <VStack className='mt-16'>
      <HStack className='mb-3 justify-between'>
        <Heading size='2xl'>{t(title)}</Heading>

        {showEditBtn ? (
          <Button variant='link' onPress={() => readonly$.set(!readonly)}>
            <ButtonText>{t(readonly ? 'edit' : 'save')}</ButtonText>
          </Button>
        ) : null}
      </HStack>

      {children(readonly)}
    </VStack>
  )
}

export default function TrackerScreen() {
  const [day, setDay] = useState(1)

  const colors = useColors()

  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <VStack className='px-6 mb-0 flex-1 bg-background-50'>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        stickyHeaderIndices={[1]}
      >
        <VStack
          className='mt-12'
          style={{ paddingTop: Constants.statusBarHeight }}
        >
          <Heading size='3xl'>{t('Tracker title')}</Heading>
          <Text>{t('Tracker description')}</Text>
        </VStack>
        <Center>
          <Heading
            className='bg-background-50 w-full pb-4'
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
            ).format(new Date(`2025-03-${day}`))}
          </Heading>

          <LinearGradient
            colors={[
              `rgb(${colors['--color-background-50']})`,
              `rgba(${colors['--color-background-50'].replaceAll(
                ' ',
                ', '
              )}, 0)`,
            ]}
            style={{
              height: 24,
              width: '100%',
            }}
          />
        </Center>

        <Calendar day={day} setDay={setDay} />

        <Wrapper title='fasting'>
          {(readonly) => <Fasting day={day} trackerView readOnly={readonly} />}
        </Wrapper>

        <Wrapper title='Prayers'>
          {(readonly) => <Prayers day={day} trackerView readOnly={readonly} />}
        </Wrapper>

        <Wrapper title='Khatm Quran' showEditBtn={false}>
          {(readonly) => <KhatmQuran day={day} trackerView readOnly={true} />}
        </Wrapper>
      </ScrollView>
    </VStack>
  )
}
