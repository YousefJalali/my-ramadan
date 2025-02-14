import { useEffect, useState, useTransition } from 'react'
import { Text } from '@/components/ui/text'
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox'
import { CheckIcon } from './ui/icon'
import { VStack } from './ui/vstack'
import { HStack } from './ui/hstack'
import { Center } from './ui/center'
import prayerTime from '@/constants/prayerTime'
import Feather from '@expo/vector-icons/Feather'
import { timeStrToMilitaryTime } from '@/utils/timeStrToMilitaryTime'
import { useToast, Toast, ToastDescription } from '@/components/ui/toast'
import Section from './Section'
import { useTranslation } from 'react-i18next'

type Props = {
  day: number
}

type Task = {
  id: string
  task: string
  isChecked: boolean
}

type Prayer = {
  prayer: string
  time: string
}

// type QuranReading = {
//   description: string
//   hizb: string[]
//   pageCount: number
//   pageFrom: number
//   pageTo: number
//   surah: string
// }

const icons = ['sunrise', 'sun', 'cloud', 'sunset', 'moon']

export default function Prayers({ day }: Props) {
  const [isPending, startTransition] = useTransition()
  const [prayers, setPrayers] = useState<Prayer[]>([])
  const [prayersStatus, setPrayersStatus] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])
  // const [quranReading, setQuranReading] = useState<QuranReading[]>([])
  const toast = useToast()
  const { t } = useTranslation()

  async function fetchDayTasks() {
    try {
      setPrayers(prayerTime[day - 1])

      // const dayDocRef = doc(db, `defaultTasks/${day}`)
      // const tasksSnapshot = await getDoc(dayDocRef)
      // const data = tasksSnapshot.data()
      // if (!data) return
      // const dayPrayers: Prayer[] = []
      // for (let [key, value] of Object.entries(data.prayers)) {
      //   dayPrayers.push({
      //     id: key,
      //     ...(value as {}),
      //   } as Prayer)
      // }
      // setPrayers(dayPrayers.sort((a, b) => a.order - b.order))
    } catch (error) {
      console.error(`Error fetching tasks for User, Day ${day}:`, error)
    }
  }

  useEffect(() => {
    startTransition(() => {
      fetchDayTasks()
    })
  }, [day])

  // function toggleTaskStatus(prayerId: string) {
  //   // setPrayers((prayers) =>
  //   //   prayers.map((prayer) =>
  //   //     prayer.id === prayerId ? { ...prayer, isChecked: !prayer.isChecked } : prayer
  //   //   )
  //   // )
  // }

  async function checkTask(prayerIdx: number) {
    const now = timeStrToMilitaryTime(new Date())

    if (timeStrToMilitaryTime(prayers[prayerIdx].time) > now) {
      toast.show({
        id: '' + Math.random(),
        placement: 'bottom',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
              <ToastDescription>Not yet</ToastDescription>
            </Toast>
          )
        },
      })
    } else {
      setPrayersStatus((p) => p.map((e, i) => (i === prayerIdx ? !e : e)))
    }
  }

  return (
    <Section title={t('Prayers')}>
      {isPending ? (
        <Center>
          <Text>{t('Loading...')}</Text>
        </Center>
      ) : prayers?.length ? (
        <Center className='w-full bg-neutral-100 p-4 rounded-2xl'>
          <HStack className='justify-between w-full'>
            {prayers.map(({ prayer, time }, i) => (
              <VStack key={prayer}>
                <Checkbox
                  onChange={(_isChecked) => checkTask(i)}
                  size='md'
                  aria-label={prayer}
                  value={prayer}
                  isChecked={prayersStatus[i]}
                  className='py-2.5 flex-col-reverse '
                >
                  <Center className='justify-between gap-1'>
                    <CheckboxLabel className='data-[checked=true]:text-primary-500'>
                      {t(prayer)}
                    </CheckboxLabel>

                    <CheckboxLabel className='data-[checked=true]:text-primary-500 py-2'>
                      <Feather
                        //@ts-ignore
                        name={icons[i]}
                        size={24}
                      />
                    </CheckboxLabel>

                    <CheckboxLabel className='data-[checked=true]:text-primary-500 text-sm'>
                      {time}
                    </CheckboxLabel>
                  </Center>

                  <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
              </VStack>
            ))}
          </HStack>
          <Text size='sm' className='mt-1 text-neutral-600'>
            {prayersStatus.filter((e) => e).length} {t('of')} 5 {t('completed')}
          </Text>
        </Center>
      ) : null}
    </Section>
  )
}
