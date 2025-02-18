import { useState } from 'react'
import TotalProgress from '@/components/TotalProgress'
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
  const dayIndex = 0

  return (
    <ParallaxScrollView headerImage={<FastingCard dayIndex={dayIndex} />}>
      <VStack className='relative py-6 pt-16 bg-neutral-50 gap-12'>
        {/* date */}
        <Center className='absolute h-20 -top-10 left-0 w-full'>
          <HijriAndGregorianDate />
        </Center>

        <Section title='monthly progress'>
          <TotalProgress />
        </Section>

        <Section title='fasting'>
          <Fasting dayIndex={dayIndex} />
        </Section>

        {/* <DaySelector dayIndex={dayIndex} onSelectDay={selectDayHandler} /> */}
        <Section title='Prayers'>
          <Prayers dayIndex={dayIndex} />
        </Section>

        <Section title='Daily Duaa'>
          <DailyDuaa dayIndex={dayIndex} />
        </Section>

        <Section title='Quran Reading'>
          <QuranReading dayIndex={dayIndex} />
        </Section>

        <Section title='On This Day'>
          <OnThisDayCard dayIndex={dayIndex} />
        </Section>

        <Section title='Azkar'>
          <Azkar />
        </Section>
      </VStack>
    </ParallaxScrollView>
  )
}
