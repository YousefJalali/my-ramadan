import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { Button, ButtonText } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio'
import { PRAYER_SETTINGS, toList } from '@/constants/prayerTimesSettings'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Stack } from 'expo-router'

const { LATITUDE_ADJUSTMENT_METHOD } = PRAYER_SETTINGS

const list = toList<RadioCheckItem[]>(LATITUDE_ADJUSTMENT_METHOD)

export default function LatitudeAdjustmentMethod() {
  const { latitudeAdjustmentMethod } = use$(settings$.prayerTimes)

  const changeHandler = async (v: string) => {
    settings$.prayerTimes.latitudeAdjustmentMethod.set(+v)
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <></>,
          headerRight: () => (
            <Button>
              <ButtonText>ha</ButtonText>
            </Button>
          ),
        }}
      />
      <RadioGroup
        value={latitudeAdjustmentMethod?.toString()}
        onChange={changeHandler}
        className='w-full flex-1'
      >
        <RadioCheckList list={list} />
      </RadioGroup>
    </>
  )
}
