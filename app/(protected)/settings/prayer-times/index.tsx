import LabeledSwitch from '@/components/LabeledSwitch'
import SettingsLink, { SettingsLinkType } from '@/components/SettingsLink'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { PRAYER_SETTINGS } from '@/constants/prayerTimesSettings'
import { PrayerTimesKeys, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'

const timeCalculationMethods: (SettingsLinkType & {
  key: PrayerTimesKeys
  constant: string
})[] = [
  {
    key: 'calculationMethod',
    subText: 'calculation method',
    path: '/settings/prayer-times/calculation-method',
    constant: 'CALCULATION_METHODS',
  },
  {
    key: 'school',
    subText: 'school',
    path: '/settings/prayer-times/school',
    constant: 'SCHOOL',
  },
  {
    key: 'latitudeAdjustmentMethod',
    subText: 'latitude adjustment method',
    path: '/settings/prayer-times/latitude-adjustment-method',
    constant: 'LATITUDE_ADJUSTMENT_METHOD',
  },
  {
    key: 'midnightMode',
    subText: 'midnight mode',
    path: '/settings/prayer-times/midnight-mode',
    constant: 'MIDNIGHT_MODE',
  },
]

const otherSettings: SettingsLinkType[] = [
  {
    subText: 'prayer time adjustment',
    path: '/settings/language',
  },
]

export default function PrayerTimes() {
  const { prayerTimes } = use$(settings$)

  const { isRecommendedEnabled } = prayerTimes

  function changeHandler() {
    settings$.prayerTimes.isRecommendedEnabled.set(!isRecommendedEnabled)
  }

  return (
    <VStack className='flex-1'>
      <VStack className='mb-3'>
        <LabeledSwitch
          label='Recommended settings'
          value={isRecommendedEnabled}
          onChange={changeHandler}
        />
        <Text size='sm' className='-mt-2'>
          Recommended
        </Text>
      </VStack>

      {isRecommendedEnabled ? null : (
        <VStack space='xs'>
          {timeCalculationMethods.map(({ path, subText, constant, key }) => (
            <SettingsLink
              key={key}
              path={path}
              subText={subText}
              preview={PRAYER_SETTINGS[constant][prayerTimes[key] as number]}
            />
          ))}
        </VStack>
      )}

      <Divider className='my-2 bg-neutral-100' />

      <VStack space='xs'>
        {otherSettings.map(({ path, subText }) => (
          <SettingsLink key={subText} path={path} subText={subText} />
        ))}
      </VStack>
    </VStack>
  )
}
