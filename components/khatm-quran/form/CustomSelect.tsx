import { ReactNode, RefAttributes, useEffect, useRef } from 'react'
import { ScrollView, TextInputProps } from 'react-native'
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
} from '@/components/ui/select'
import { ChevronDownIcon } from '@/components/ui/icon'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'

export default function CustomSelect({
  selectedValue,
  onChange,
  placeholder,
  label,
  children,
  disabled = false,
}: {
  selectedValue: string
  onChange: (arg: string) => void
  placeholder: string
  label: string
  children: ReactNode
  disabled?: boolean
}) {
  const ref = useRef<TextInputProps>(null)

  useEffect(() => {
    if (!selectedValue.length) {
      console.log('cleared')
      //@ts-ignore
      ref.current?.clear()
    }
  }, [selectedValue])

  return (
    <FormControl
      className={`flex-1 ${label === 'Juz' ? 'max-w-20' : ''}`}
      isDisabled={disabled}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Select selectedValue={selectedValue} onValueChange={onChange}>
        <SelectTrigger variant='outline' size='md'>
          <SelectInput
            ref={ref}
            placeholder={placeholder}
            className='text-sm h-12 px-2 flex-1'
          />
          <SelectIcon className='mr-3' as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal snapPoints={[40]}>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>

            <ScrollView
              className='w-full'
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              {children}
            </ScrollView>
          </SelectContent>
        </SelectPortal>
      </Select>
    </FormControl>
  )
}
