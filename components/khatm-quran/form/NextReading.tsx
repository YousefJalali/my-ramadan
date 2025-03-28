import { SelectItem } from '@/components/ui/select'
import { HStack } from '@/components/ui/hstack'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import { AlertCircleIcon } from 'lucide-react-native'
import CustomSelect from './CustomSelect'
import QURAN_JUZ from '@/data/quran_juz.json'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { khatmQuran$ } from '@/stores/store'

const schema = z.object({
  juzIndex: z.string(),
  surahIndex: z.string(),
  verse: z.string(),
})

type SchemaType = z.infer<typeof schema>

export default function NextReading() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    resetField,
    setValue,
    watch,
  } = useForm<SchemaType>({
    defaultValues: {
      juzIndex: '',
      surahIndex: '',
      verse: '',
    },
    resolver: zodResolver(schema),
  })

  const nextReading = khatmQuran$.nextReading()

  return (
    <HStack space='lg'>
      <Controller
        defaultValue=''
        name='juzIndex'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomSelect
            selectedValue={value}
            onChange={(v) => {
              onChange(v)
              resetField('surahIndex')
              resetField('verse')
            }}
            label='Juz'
            placeholder=''
          >
            {QURAN_JUZ.map((v, i) => (
              <SelectItem
                key={v.juz}
                label={v.juz}
                value={i.toString()}
                disabled={+v.juz < +nextReading.juz}
                className='disabled:opacity-20'
              />
            ))}
          </CustomSelect>
        )}
      />

      <Controller
        defaultValue=''
        name='surahIndex'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomSelect
            selectedValue={value}
            onChange={(v) => {
              onChange(v)
              resetField('verse')
            }}
            label='Surah'
            placeholder=''
            disabled={!watch('juzIndex').length}
          >
            {QURAN_JUZ[+watch('juzIndex') || 0].surah.map(
              ({ name_en, name_ar, verses }, i) => (
                <SelectItem
                  key={name_en}
                  label={name_en + ' ' + verses.join(':')}
                  value={i.toString()}
                  className='disabled:opacity-20'
                  disabled={
                    +QURAN_JUZ[+watch('juzIndex') || 0].juz === +nextReading.juz
                      ? nextReading.surah[
                          Math.min(i, nextReading.surah.length - 1)
                        ].name_en !== name_en
                      : false
                  }
                />
              )
            )}
          </CustomSelect>
        )}
      />

      <FormControl
        className='flex-1 max-w-16'
        // isInvalid={!!verseError}
        isDisabled={!watch('surahIndex').length}
      >
        <FormControlLabel>
          <FormControlLabelText>Verse</FormControlLabelText>
        </FormControlLabel>

        <Controller
          defaultValue=''
          name='verse'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant='outline' size='md'>
              <InputField
                keyboardType='numeric'
                placeholder=''
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                // onBlur={validateVerse}
              />
            </Input>
          )}
        />

        {/* <FormControlError className='absolute -right-10 top-20 w-screen'>
      <FormControlErrorIcon as={AlertCircleIcon} />
      <FormControlErrorText>{verseError}</FormControlErrorText>
    </FormControlError> */}
      </FormControl>
    </HStack>
  )
}
