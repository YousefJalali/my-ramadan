import { useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { LinkText } from '@/components/ui/link'
// import Link from "@unitools/link";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { Button, ButtonText } from '@/components/ui/button'
import { Keyboard } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/utils/supabase'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'
// import useRouter from "@unitools/router";
// import { AuthLayout } from "../layout";

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
})

type SchemaType = z.infer<typeof schema>

export default function Login() {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ email }: SchemaType) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'com.jbygoal.my_ramadan://update-password',
    })

    if (error) {
      setError('An error occurred. Please try again.')
    } else {
      setSuccess(
        'If an account with this email exists, you will receive a reset link shortly.'
      )
    }
  }

  const handleKeyPress = () => {
    Keyboard.dismiss()
    handleSubmit(onSubmit)()
  }
  // const router = useRouter();

  return (
    <VStack className='flex-1 w-full' space='md'>
      <VStack space='sm'>
        <Heading size='3xl'>{t('Forgot Password')}</Heading>
        <Text>
          {t(
            'Enter your email address below, and we will send you a link to reset your password.'
          )}
        </Text>
      </VStack>

      <VStack className='flex-1 mt-6'>
        <VStack space='xl' className='w-full'>
          <FormControl isInvalid={!!errors?.email} className='w-full'>
            <FormControlLabel>
              <FormControlLabelText className='capitalize flex-1'>
                {t('email')}
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=''
              name='email'
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await schema.parseAsync({ email: value })
                    return true
                  } catch (error: any) {
                    return error.message
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder={t('email')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType='done'
                    className='text-sm'
                  />
                </Input>
              )}
            />
            <FormControlError>
              {/* <FormControlErrorIcon as={AlertTriangle} /> */}
              <FormControlErrorText>
                {t(errors?.email?.message || '')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {success ? <Text>{success}</Text> : null}
          {error ? <Text>{error}</Text> : null}
        </VStack>
        <VStack className='w-full my-7 ' space='lg'>
          <Button className='w-full' onPress={handleSubmit(onSubmit)}>
            <ButtonText className='font-medium'>
              {t('Send Reset Link')}
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
