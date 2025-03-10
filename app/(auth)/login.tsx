import { useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { LinkText } from '@/components/ui/link'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { Keyboard } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/utils/supabase'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { AuthError } from '@supabase/supabase-js'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    setLoading(false)

    if (error) setError(error)
  }

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  const handleKeyPress = () => {
    Keyboard.dismiss()
    handleSubmit(onSubmit)()
  }
  // const router = useRouter();

  return (
    <VStack className='w-full flex-1' space='md'>
      <KeyboardAwareScrollView bottomOffset={50} style={{ flex: 1 }}>
        <VStack space='sm' className='mb-6'>
          <Heading size='3xl'>{t('log in')}</Heading>
          <Text>{t('login to start using the app')}</Text>
        </VStack>

        <VStack className='flex-1'>
          <VStack space='xl'>
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
                      await loginSchema.parseAsync({ email: value })
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
                      className='text-sm flex-1'
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

            <FormControl isInvalid={!!errors.password} className='w-full'>
              <FormControlLabel>
                <FormControlLabelText>{t('password')}</FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=''
                name='password'
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await loginSchema.parseAsync({ password: value })
                      return true
                    } catch (error: any) {
                      return error.message
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('password')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType='done'
                      className='text-sm'
                    />
                    <InputSlot onPress={handleState} className='px-3'>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                {/* <FormControlErrorIcon as={AlertTriangle} /> */}
                <FormControlErrorText>
                  {t(errors?.password?.message || '')}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <HStack className='w-full justify-end'>
              <Link href='/reset-password'>
                <LinkText className='font-medium text-sm text-primary-700 group-hover/link:text-primary-600'>
                  {t('forgot password?')}
                </LinkText>
              </Link>
            </HStack>
          </VStack>

          {error ? (
            <Text className='text-error-600'>{error.message}</Text>
          ) : null}

          <VStack className='w-full my-7 ' space='lg'>
            <Button className='w-full' onPress={handleSubmit(onSubmit)}>
              {loading ? <ButtonSpinner /> : null}
              <ButtonText className='font-medium'>
                {loading ? 'Signing in...' : t('log in')}
              </ButtonText>
            </Button>
          </VStack>
          <HStack className='self-center' space='sm'>
            <Text size='md'>{t("don't have an account?")}</Text>
            <Link href='/signup'>
              <LinkText className='font-medium text-primary-700' size='md'>
                {t('sign up')}
              </LinkText>
            </Link>
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
