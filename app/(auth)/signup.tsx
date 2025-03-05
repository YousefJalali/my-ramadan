import { useState } from 'react'
import { Toast, ToastTitle, useToast } from '@/components/ui/toast'
import { HStack } from '@/components/ui/hstack'
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
import { Button, ButtonText } from '@/components/ui/button'
import { Keyboard } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/utils/supabase'
import { Link } from 'expo-router'
import { AlertTriangle } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { LinkText } from '@/components/ui/link'

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email(),
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
type SignUpSchemaType = z.infer<typeof signUpSchema>

export default function SignUp() {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })
  const toast = useToast()

  const onSubmit = async (data: SignUpSchemaType) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    })

    if (error) alert(error.message)
    if (!session) alert('Please check your inbox for email verification!')
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
    <VStack className='max-w-[440px] w-full' space='md'>
      <VStack className='mb-6' space='sm'>
        <Heading className='md:text-center' size='3xl'>
          {t('sign up')}
        </Heading>
        <Text>{t('sign up to start using the app')}</Text>
      </VStack>

      <VStack className='w-full'>
        <VStack space='xl' className='w-full'>
          <FormControl isInvalid={!!errors.name}>
            <FormControlLabel>
              <FormControlLabelText className='capitalize flex-1'>
                {t('name')}
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name='name'
              defaultValue=''
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({ name: value })
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
                    placeholder={t('type here...')}
                    type='text'
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType='done'
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon size='md' as={AlertTriangle} />
              <FormControlErrorText>
                {t(errors?.name?.message || '')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText className='capitalize flex-1'>
                {t('email')}
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name='email'
              defaultValue=''
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({ email: value })
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
                    placeholder={t('type here...')}
                    type='text'
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType='done'
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon size='md' as={AlertTriangle} />
              <FormControlErrorText>
                {t(errors?.email?.message || '')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
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
                    await signUpSchema.parseAsync({
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
                    placeholder={t('type here...')}
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
          <FormControl isInvalid={!!errors.confirmPassword}>
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
                    await signUpSchema.parseAsync({
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
                    placeholder={t('type here...')}
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
          <Button className='w-full' onPress={handleSubmit(onSubmit)}>
            <ButtonText className='font-medium'>{t('sign up')}</ButtonText>
          </Button>
          {/* <Button
            variant='outline'
            action='secondary'
            className='w-full gap-1'
            onPress={() => {}}
          >
            <ButtonText className='font-medium'>
              Continue with Google
            </ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button> */}
        </VStack>
        <HStack className='self-center' space='sm'>
          <Text size='md'>{t('already have an account?')}</Text>
          <Link href='/login'>
            <LinkText className='font-medium text-primary-700' size='md'>
              {t('log in')}
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}
