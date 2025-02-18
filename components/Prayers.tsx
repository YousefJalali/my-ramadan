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
import PrayerCountdown from './PrayerCountdown'
import { use$ } from '@legendapp/state/react'
import { progress$ } from '@/store'
import { setToTodaysDate } from '@/utils/setToTodaysDate'
import { cn } from '@/utils/cn'
import StatusBadge from './StatusBadge'

type Props = {
  dayIndex: number
  trackerView?: boolean
  readOnly?: boolean
}

const icons = ['sunrise', 'sun', 'cloud', 'sunset', 'moon']

export default function Prayers({
  dayIndex,
  trackerView = false,
  readOnly = false,
}: Props) {
  const prayers = prayerTime[dayIndex]
  const { prayers: prayersProgress } = use$(progress$)

  const toast = useToast()
  const { t } = useTranslation()

  async function checkTask(prayerIdx: number) {
    progress$.prayers[prayerIdx][dayIndex].set(
      !prayersProgress[prayerIdx][dayIndex]
    )

    // const today = new Date()

    // const prayerDate = setToTodaysDate(prayers[prayerIdx].time)

    // if (prayerDate.getTime() > today.getTime()) {
    //   toast.show({
    //     id: '' + Math.random(),
    //     placement: 'bottom',
    //     duration: 3000,
    //     render: ({ id }) => {
    //       const uniqueToastId = 'toast-' + id
    //       return (
    //         <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
    //           <ToastDescription>
    //             {t("Prayer time hasn't arrived yet")}
    //           </ToastDescription>
    //         </Toast>
    //       )
    //     },
    //   })
    // } else {
    //   progress$.prayers[prayerIdx][dayIndex].set(
    //     !prayersProgress[prayerIdx][dayIndex]
    //   )
    // }
  }

  return (
    <Center
      className={`w-full bg-neutral-100 p-4 rounded-2xl ${cn(
        trackerView,
        'p-0 bg-transparent'
      )}`}
    >
      <HStack
        className={`justify-between w-full ${cn(trackerView, 'flex-col')}`}
      >
        {prayers.map(({ prayer, time }, prayerIndex) => (
          <VStack key={prayer}>
            <Checkbox
              onChange={(_isChecked) => checkTask(prayerIndex)}
              size='md'
              aria-label={prayer}
              value={prayer}
              isChecked={prayersProgress[prayerIndex][dayIndex]}
              className={`py-2.5 flex-col-reverse ${cn(
                trackerView,
                'flex-row space-between'
              )}`}
              isDisabled={readOnly}
            >
              <Center
                className={`justify-between gap-1 ${cn(
                  trackerView,
                  'flex-row flex-1'
                )}`}
              >
                <Center
                  className={cn(
                    trackerView,
                    'flex-row-reverse gap-2 flex-1 justify-end'
                  )}
                >
                  <CheckboxLabel className='data-[checked=true]:text-primary-500 data-[disabled=true]:opacity-100 '>
                    {t(prayer)}
                  </CheckboxLabel>

                  <CheckboxLabel className='data-[checked=true]:text-primary-500 py-2 data-[disabled=true]:opacity-100'>
                    <Feather
                      //@ts-ignore
                      name={icons[prayerIndex]}
                      size={24}
                    />
                  </CheckboxLabel>
                </Center>

                <CheckboxLabel
                  className={`data-[checked=true]:text-primary-500 data-[disabled=true]:opacity-100 text-sm ${cn(
                    trackerView,
                    'flex-1 text-center'
                  )}`}
                >
                  {formatTime(time)}
                </CheckboxLabel>
              </Center>

              <Center className='basis-1/3 items-end'>
                {readOnly ? (
                  <StatusBadge
                    isCompleted={prayersProgress[prayerIndex][dayIndex]}
                  />
                ) : (
                  <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                )}
              </Center>
            </Checkbox>
          </VStack>
        ))}
      </HStack>

      {trackerView ? null : <PrayerCountdown dayIndex={dayIndex} />}
    </Center>
  )
}
