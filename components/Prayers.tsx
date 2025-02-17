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
import { useToast, Toast, ToastDescription } from '@/components/ui/toast'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@/utils/formatTime'
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge'
import { Check, GlobeIcon } from 'lucide-react-native'
import PrayerCountdown from './PrayerCountdown'

type Props = {
  day: number
  direction?: 'vertical' | 'horizontal'
}

type Prayer = {
  prayer: string
  time: string
}

const icons = ['sunrise', 'sun', 'cloud', 'sunset', 'moon']

export default function Prayers({ day, direction = 'horizontal' }: Props) {
  const [isPending, startTransition] = useTransition()
  const [prayers, setPrayers] = useState<Prayer[]>([])
  const [prayersStatus, setPrayersStatus] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])

  const toast = useToast()
  const { t } = useTranslation()

  async function fetchDayTasks() {
    try {
      setPrayers(prayerTime[day - 1])
    } catch (error) {
      console.error(`Error fetching tasks for User, Day ${day}:`, error)
    }
  }

  useEffect(() => {
    startTransition(() => {
      fetchDayTasks()
    })
  }, [day])

  async function checkTask(prayerIdx: number) {
    const today = new Date()

    const prayerDate = new Date(prayers[prayerIdx].time)

    // Set the prayer date to today's date
    prayerDate.setFullYear(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    if (prayerDate.getTime() > today.getTime()) {
      toast.show({
        id: '' + Math.random(),
        placement: 'bottom',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
              <ToastDescription>
                {t("Prayer time hasn't arrived yet")}
              </ToastDescription>
            </Toast>
          )
        },
      })
    } else {
      setPrayersStatus((p) => p.map((e, i) => (i === prayerIdx ? !e : e)))
    }
  }

  function verticalStyle(classes: string) {
    return direction === 'vertical' ? `${classes}` : ''
  }

  return isPending ? (
    <Center>
      <Text>{t('Loading...')}</Text>
    </Center>
  ) : prayers?.length ? (
    <Center
      className={`w-full bg-neutral-100 p-4 rounded-2xl ${verticalStyle(
        'p-0 bg-transparent'
      )}`}
    >
      <HStack className={`justify-between w-full ${verticalStyle('flex-col')}`}>
        {prayers.map(({ prayer, time }, i) => (
          <VStack key={prayer}>
            <Checkbox
              onChange={(_isChecked) => checkTask(i)}
              size='md'
              aria-label={prayer}
              value={prayer}
              isChecked={prayersStatus[i]}
              className={`py-2.5 flex-col-reverse ${verticalStyle(
                'flex-row space-between'
              )}`}
            >
              <Center
                className={`justify-between gap-1 ${verticalStyle(
                  'flex-row space-between flex-1'
                )}`}
              >
                <Center
                  className={verticalStyle(
                    'flex-row-reverse gap-2 flex-1 justify-end'
                  )}
                >
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
                </Center>

                {direction === 'vertical' ? (
                  <HStack className='flex-1 justify-end px-4'>
                    <Badge
                      size='md'
                      variant='outline'
                      action='success'
                      className='gap-2 rounded-xl'
                    >
                      <BadgeText>{t('completed')}</BadgeText>
                      <BadgeIcon as={Check} />
                    </Badge>
                  </HStack>
                ) : null}

                <CheckboxLabel className='data-[checked=true]:text-primary-500 text-sm'>
                  {formatTime(time)}
                </CheckboxLabel>
              </Center>

              <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          </VStack>
        ))}
      </HStack>
      {direction === 'vertical' ? null : (
        <PrayerCountdown day={day} />
        // <Text size='sm' className='mt-1 text-neutral-600'>
        //   {prayersStatus.filter((e) => e).length} {t('of')} 5 {t('completed')}
        // </Text>
      )}
    </Center>
  ) : null
}
