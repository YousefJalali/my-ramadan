import { HStack } from '@/components/ui/hstack'
import { Switch } from '@/components/ui/switch'
import { Text } from '@/components/ui/text'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
  value: boolean
  onChange: () => void
}

export default function LabeledSwitch({ label, value, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <HStack className='items-center justify-between w-full'>
      <Text size='lg' className='text-neutral-900'>
        {t(label)}
      </Text>

      <Switch
        value={value}
        onChange={onChange}
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
  )
}
