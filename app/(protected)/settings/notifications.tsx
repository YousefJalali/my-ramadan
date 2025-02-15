import { HStack } from '@/components/ui/hstack'
import { Switch } from '@/components/ui/switch'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Divider } from '@/components/ui/divider'
import React from 'react'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { useTranslation } from 'react-i18next'

export default function Notifications() {
  const { t } = useTranslation()
  return (
    <VStack>
      {[
        'Prayers notifications',
        'Azkar notifications',
        'Quran reading notifications',
      ].map((n, i, arr) => (
        <React.Fragment key={n}>
          <HStack className='items-center justify-between w-full'>
            <Text size='lg'>{t(n)}</Text>

            <Switch
              size='md'
              trackColor={{
                false: `rgb(${colors.light['--color-neutral-100']})`,
                true: `rgb(${colors.light['--color-primary-600']})`,
              }}
              thumbColor={`rgb(${colors.light['--color-neutral-300']})`}
              // activeThumbColor={colors.gray[50]}
              ios_backgroundColor={`rgb(${colors.light['--color-primary-50']})`}
            />
          </HStack>

          {i !== arr.length - 1 ? (
            <Divider className='my-4 bg-neutral-100' />
          ) : null}
        </React.Fragment>
      ))}
    </VStack>
  )
}
