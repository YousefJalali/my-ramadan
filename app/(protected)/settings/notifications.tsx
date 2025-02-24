import { VStack } from '@/components/ui/vstack'
import { Divider } from '@/components/ui/divider'
import React from 'react'
import LabeledSwitch from '@/components/LabeledSwitch'
import { use$ } from '@legendapp/state/react'
import { settings$, Notification } from '@/store'

const list: { key: keyof Notification; label: string }[] = [
  {
    key: 'prayers',
    label: 'Prayers notifications',
  },
  {
    key: 'azkar',
    label: 'Adhkar notifications',
  },
  {
    key: 'quranReading',
    label: 'Quran reading notifications',
  },
]

export default function Notifications() {
  const notifications = use$(settings$.notifications)

  function changeHandler(key: keyof Notification) {
    settings$.notifications[key].set(!notifications[key])
  }

  return (
    <VStack>
      {list.map(({ key, label }, i, arr) => (
        <React.Fragment key={key}>
          <LabeledSwitch
            key={label}
            label={label}
            value={notifications[key]}
            onChange={() => changeHandler(key)}
          />

          {i !== arr.length - 1 ? (
            <Divider className='my-4 bg-neutral-100' />
          ) : null}
        </React.Fragment>
      ))}
    </VStack>
  )
}
