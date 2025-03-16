import LabeledSwitch from '@/components/LabeledSwitch'
import SettingsLink, { SettingsLinkType } from '@/components/SettingsLink'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { PRAYER_TIME_METHODS } from '@/constants/prayerTimeCalculation'
import { PrayerTimeSettingsKeys, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { useTranslation } from 'react-i18next'

const timeCalculationMethods: (SettingsLinkType & {
  key: PrayerTimeSettingsKeys
})[] = [
  {
    key: 'method',
    subText: 'calculation method',
    path: '/settings/prayer-times/calculation-method',
  },
  {
    key: 'school',
    subText: 'school',
    path: '/settings/prayer-times/school',
  },
  {
    key: 'latitudeAdjustmentMethod',
    subText: 'latitude adjustment method',
    path: '/settings/prayer-times/latitude-adjustment-method',
  },
  {
    key: 'midnightMode',
    subText: 'midnight mode',
    path: '/settings/prayer-times/midnight-mode',
  },
]

const otherSettings: SettingsLinkType[] = [
  {
    subText: 'prayer time adjustment',
    path: '/settings/prayer-times/prayer-time-adjustment',
  },
]

export default function PrayerTimes() {
  const { t } = useTranslation()
  const { prayerTimes } = use$(settings$)

  const isRecommendedEnabled = prayerTimes.isRecommendedEnabled.value

  function changeHandler() {
    settings$.prayerTimes.isRecommendedEnabled.change()
  }

  return (
    <VStack className='flex-1'>
      <VStack className='mb-3'>
        <LabeledSwitch
          label={t('recommended settings')}
          value={isRecommendedEnabled}
          onChange={changeHandler}
        />
        {isRecommendedEnabled ? (
          <Text size='sm'>
            {t(PRAYER_TIME_METHODS['method'][prayerTimes['method'] as number])}
          </Text>
        ) : null}
      </VStack>

      {isRecommendedEnabled ? null : (
        <VStack space='xs'>
          {timeCalculationMethods.map(({ path, subText, key }) => (
            <SettingsLink
              key={key}
              path={path}
              subText={subText}
              preview={PRAYER_TIME_METHODS[key][prayerTimes[key] as number]}
            />
          ))}
        </VStack>
      )}

      <Divider className='my-2 bg-background-100' />

      <VStack space='xs'>
        {otherSettings.map(({ path, subText }) => (
          <SettingsLink key={subText} path={path} subText={subText} />
        ))}
      </VStack>
    </VStack>
  )
}
