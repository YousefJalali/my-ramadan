import { useEffect, useState } from 'react'

import Progress from '@/components/Progress'
import Flashback from '@/components/Flashback'
import DaySelector from '@/components/DaySelector'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import Prayers from '@/components/Prayers'
import { VStack } from '@/components/ui/vstack'
import { ScrollView } from '@/components/ui/scroll-view'
import DailyDuaa from '@/components/DailyDuaa'
import FastingTimeline from '@/components/FastingTimline'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import QuranReading from '@/components/QuranReading'
import Azkar from '@/components/Azkar'

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(1)

  // async function addDefaultFlashbacks() {
  //   try {
  //     const flashbacksCollection = collection(db, 'flashbacks')
  //     let i = 1
  //     for (const innerArray of flashback) {
  //       for (const f of innerArray) {
  //         await addDoc(flashbacksCollection, {
  //           day: i,
  //           title: f.title,
  //           description: f.description,
  //         })
  //       }
  //       i++
  //       console.log(i)
  //     }
  //     console.log('Transaction successfully committed!')
  //   } catch (e) {
  //     console.log('Transaction failed: ', e)
  //   }
  // }

  // function makeTasks() {
  //   let obj: {
  //     [day: string]: {
  //       quran: {
  //         description: string
  //         prayer: string
  //         pageFrom: number
  //         pageTo: number
  //         pageCount: number
  //         surah: string
  //         hizb: number[]
  //       }
  //       prayers: {
  //         [prayer: string]: {
  //           order: number
  //           description: string
  //         }
  //       }
  //     }
  //   } = {}
  //   for (let i = 1; i <= 30; i++) {
  //     const day = '' + i
  //     const quran = ramadanAzkar[day]
  //     const prayers = ramadanPrayers[day]

  //     obj[i] = {
  //       quran: {
  //         ...quran,
  //         pageCount: quran.pageTo - quran.pageFrom,
  //         hizb: [
  //           quran.hizb.split(' ')[1].split('-')[0],
  //           quran.hizb.split(' ')[1].split('-')[1],
  //         ],
  //       },
  //       prayers: {
  //         Fajr: {
  //           order: 1,
  //           description: prayers[0],
  //         },
  //         Dhuhr: {
  //           order: 2,
  //           description: prayers[1],
  //         },
  //         Asr: {
  //           order: 3,
  //           description: prayers[2],
  //         },
  //         Maghrib: {
  //           order: 4,
  //           description: prayers[3],
  //         },
  //         Isha: {
  //           order: 5,
  //           description: prayers[4],
  //         },
  //       },
  //     }
  //   }

  //   console.log(obj)
  // }

  // async function populateDefaultTasks() {
  //   try {
  //     // Loop through each day
  //     for (const [day, tasks] of Object.entries(checklist)) {
  //       // Create a document for the day in the 'defaultTasks' collection
  //       const dayDocRef = doc(db, 'defaultTasks', day) // Each day (1, 2, etc.) becomes a document

  //       let t: { [taskId: string]: {} } = {}
  //       for (const [key, value] of Object.entries(tasks)) {
  //         t[key] = value
  //       }

  //       await setDoc(dayDocRef, t)
  //     }

  //     console.log('Default tasks successfully added!')
  //   } catch (error) {
  //     console.error('Error adding default tasks:', error)
  //   }
  // }

  useEffect(() => {
    // makeTasks()
    // populateDefaultTasks()
    // addDefaultFlashbacks()
  }, [])

  function selectDayHandler(day: number) {
    setSelectedDay(day)
  }

  return (
    <ParallaxScrollView headerImage={<FastingTimeline />}>
      <VStack className='py-6 bg-neutral-50 gap-8'>
        <Progress />

        {/* <DaySelector day={selectedDay} onSelectDay={selectDayHandler} /> */}

        <Prayers day={selectedDay} />

        <Flashback day={selectedDay} />

        <DailyDuaa day={selectedDay} />

        <QuranReading day={selectedDay} />

        <Azkar />
      </VStack>
    </ParallaxScrollView>
  )
}
