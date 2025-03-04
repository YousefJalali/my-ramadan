import { HStack } from '@/components/ui/hstack'
import { Switch } from '@/components/ui/switch'
import { Text } from '@/components/ui/text'
import { useTranslation } from 'react-i18next'
import useColors from '@/hooks/useColors'

type Props = {
  label: string
  value: boolean
  onChange: () => void
}

export default function LabeledSwitch({ label, value, onChange }: Props) {
  const { t } = useTranslation()
  const colors = useColors()

  return (
    <HStack className='items-center justify-between w-full'>
      <Text size='lg' className='text-typography-900'>
        {t(label)}
      </Text>

      <Switch
        value={value}
        onChange={onChange}
        size='md'
        trackColor={{
          // false: `rgb(${colors['--color-background-200']})`,
          true: `rgb(${colors['--color-primary-400']})`,
        }}
        ios_backgroundColor={`rgb(${colors['--color-background-50']})`}
      />
    </HStack>
  )
}
