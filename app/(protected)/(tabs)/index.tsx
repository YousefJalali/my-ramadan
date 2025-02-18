import { useState } from 'react'
import Progress from '@/components/Progress'
import OnThisDayCard from '@/components/OnThisDayCard'
import { Center } from '@/components/ui/center'
import Prayers from '@/components/Prayers'
import { VStack } from '@/components/ui/vstack'
import DailyDuaa from '@/components/DailyDuaa'
import FastingCard from '@/components/fasting-card/FastingCard'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import QuranReading from '@/components/QuranReading'
import Azkar from '@/components/Azkar'
import HijriAndGregorianDate from '@/components/HijriAndGregorianDate'
import Section from '@/components/Section'
import Fasting from '@/components/Fasting'

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(1)

  return (
    <ParallaxScrollView headerImage={<FastingCard day={selectedDay} />}>
      <VStack className='relative py-6 pt-16 bg-neutral-50 gap-12'>
        {/* date */}
        <Center className='absolute h-20 -top-10 left-0 w-full'>
          <HijriAndGregorianDate />
        </Center>

        <Section title='Daily progress'>
          <Progress
            data={{
              Fasting: [selectedDay, 30],
              Prayers: [4, 5],
              'Quran Reading': [5, 20],
            }}
          />
        </Section>

        <Section title='fasting'>
          <Fasting day={selectedDay} />
        </Section>

        {/* <DaySelector day={selectedDay} onSelectDay={selectDayHandler} /> */}
        <Section title='Prayers'>
          <Prayers day={selectedDay} />
        </Section>

        <Section title='Daily Duaa'>
          <DailyDuaa day={selectedDay} />
        </Section>

        <Section title='Quran Reading'>
          <QuranReading day={selectedDay} />
        </Section>

        <Section title='On This Day'>
          <OnThisDayCard day={selectedDay} />
        </Section>

        <Section title='Azkar'>
          <Azkar />
        </Section>
      </VStack>
    </ParallaxScrollView>
  )
}
