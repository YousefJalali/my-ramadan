import { useEffect, useState } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
// import { Link, LinkText } from '@/components/ui/link'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
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
import { AlertTriangle } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { Link, useRouter } from 'expo-router'

const schema = z.object({
  password: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
  confirmPassword: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
})
type SchemaType = z.infer<typeof schema>

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [status, setStatus] = useState<null | {
    status: string
    message: string
  }>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== 'PASSWORD_RECOVERY') {
        router.push('/(auth)/reset-password')
      }
    })
  }, [])

  const onSubmit = async ({ password }: SchemaType) => {
    setLoading(true)
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    setLoading(false)

    if (data)
      setStatus({
        status: 'success',
        message: 'Password updated successfully!',
      })
    if (error)
      setStatus({
        status: 'failed',
        message: 'There was an error updating your password.',
      })
  }

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => {
      return !showState
    })
  }
  const handleKeyPress = () => {
    Keyboard.dismiss()
    handleSubmit(onSubmit)()
  }

  return (
    <VStack className='w-full flex-1' space='md'>
      <VStack className='mb-6' space='sm'>
        <Heading className='md:text-center' size='3xl'>
          {t('enter new password')}
        </Heading>
        <Text>{t('set a new password to secure your account')}</Text>
      </VStack>

      {status ? (
        <VStack>
          <Text>{status.message}</Text>
          {status.status === 'success' ? (
            <Link href='/'>{t('Home')}</Link>
          ) : (
            <Link href='/(auth)/reset-password'>{t('try again')}</Link>
          )}
        </VStack>
      ) : (
        <VStack className='w-full'>
          <VStack space='xl' className='w-full'>
            <FormControl isInvalid={!!errors.password} isDisabled={loading}>
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
                      await schema.parseAsync({
                        password: value,
                      })
                      return true
                    } catch (error: any) {
                      return error.message
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      className='text-sm'
                      placeholder={t('password')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType='done'
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputSlot onPress={handleState} className='px-3'>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon size='sm' as={AlertTriangle} />
                <FormControlErrorText>
                  {t(errors?.password?.message || '')}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={!!errors.confirmPassword}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>
                  {t('confirm password')}
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=''
                name='confirmPassword'
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await schema.parseAsync({
                        password: value,
                      })
                      return true
                    } catch (error: any) {
                      return error.message
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder={t('confirm password')}
                      className='text-sm'
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType='done'
                      type={showConfirmPassword ? 'text' : 'password'}
                    />

                    <InputSlot onPress={handleConfirmPwState} className='px-3'>
                      <InputIcon
                        as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon size='sm' as={AlertTriangle} />
                <FormControlErrorText>
                  {t(errors?.confirmPassword?.message || '')}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          <VStack className='w-full my-7' space='lg'>
            <Button
              className='w-full'
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? <ButtonSpinner /> : null}
              <ButtonText className='font-medium'>
                {loading ? t('updating password...') : t('update password')}
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}
