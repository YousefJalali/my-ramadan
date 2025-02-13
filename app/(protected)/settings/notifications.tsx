import { HStack } from '@/components/ui/hstack'
import { Switch } from '@/components/ui/switch'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Divider } from '@/components/ui/divider'
import React from 'react'
import { colors } from '@/components/ui/gluestack-ui-provider/config'

export default function Notifications() {
  return (
    <VStack>
      {['Prayers', 'Azkar', 'Quran reading'].map((n, i, arr) => (
        <React.Fragment key={n}>
          <HStack className='items-center justify-between'>
            <Text size='lg'>{n} notifications</Text>

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
