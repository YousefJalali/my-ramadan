import TotalProgress from '@/components/total-progress/TotalProgress'
import OnThisDayCard from '@/components/OnThisDayCard'
import { Center } from '@/components/ui/center'
import Prayers from '@/components/Prayers'
import { VStack } from '@/components/ui/vstack'
import DailyDuaa from '@/components/DailyDuaa'
import FastingCard from '@/components/fasting-card/FastingCard'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import KhatmQuran from '@/components/khatm-quran/KhatmQuran'
import Adhkar from '@/components/Adhkar'
import HijriAndGregorianDate from '@/components/HijriAndGregorianDate'
import Section from '@/components/Section'
import Fasting from '@/components/Fasting'
import { gregorianToHijri } from '@/utils/gregorianToHijri'
import { Link } from 'expo-router'

export default function HomeScreen() {
  const day = +gregorianToHijri(new Date())

  return (
    <ParallaxScrollView headerImage={<FastingCard day={day} />}>
      <VStack className='relative py-6 pt-24 bg-background-50 gap-12'>
        {/* date */}
        <Center className='absolute h-20 -top-10 left-0 w-full'>
          <HijriAndGregorianDate />
        </Center>

        <Section title='monthly progress'>
          <Link href='/tracker'>
            <TotalProgress />
          </Link>
        </Section>

        <Section title='fasting'>
          <Fasting day={day} />
        </Section>

        {/* <DaySelector day={day} onSelectDay={selectDayHandler} /> */}
        <Section title='Prayers'>
          <Prayers day={day} />
        </Section>

        <Section title='Daily Duaa'>
          <DailyDuaa day={day} />
        </Section>

        <Section title='Khatm Quran'>
          <KhatmQuran day={day} />
        </Section>

        <Section title='On This Day'>
          <OnThisDayCard day={day} />
        </Section>

        <Section title='Adhkar' link='/(protected)/adhkar'>
          <Adhkar />
        </Section>
      </VStack>
    </ParallaxScrollView>
  )
}
