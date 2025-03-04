import React, { useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { LinkText } from '@/components/ui/link'
// import Link from "@unitools/link";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox'
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from '@/components/ui/icon'
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

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
  rememberme: z.boolean().optional(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export default function Login() {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  })

  const onSubmit = async (data: LoginSchemaType) => {
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) alert(error.message)
  }
  const [showPassword, setShowPassword] = useState(false)
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [loading, setLoading] = useState(false)

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
    <VStack className='max-w-[440px] w-full' space='md'>
      <VStack space='sm'>
        <Heading size='3xl'>{t('log in')}</Heading>
        <Text>{t('login to start using the app')}</Text>
      </VStack>

      <VStack className='w-full mt-6'>
        <VStack space='xl' className='w-full'>
          <FormControl
            isInvalid={!!errors?.email || !validated.emailValid}
            className='w-full'
          >
            <FormControlLabel>
              <FormControlLabelText>{t('email')}</FormControlLabelText>
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
                    placeholder={t('type here...')}
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
              {/* <FormControlErrorIcon as={AlertTriangle} /> */}
              <FormControlErrorText>
                {errors?.email?.message ||
                  (!validated.emailValid && 'Email ID not found')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Label Message */}
          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
            className='w-full'
          >
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
                    placeholder={t('type here...')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType='done'
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
                {errors?.password?.message ||
                  (!validated.passwordValid && 'Password incorrect')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className='w-full justify-between'>
            <Controller
              name='rememberme'
              defaultValue={false}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  size='sm'
                  value='Remember me'
                  isChecked={value}
                  onChange={onChange}
                  aria-label='Remember me'
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{t('remember me')}</CheckboxLabel>
                </Checkbox>
              )}
            />
            <Link href='/login'>
              <LinkText className='font-medium text-sm text-primary-700 group-hover/link:text-primary-600'>
                {t('forgot password?')}
              </LinkText>
            </Link>
          </HStack>
        </VStack>
        <VStack className='w-full my-7 ' space='lg'>
          <Button className='w-full' onPress={handleSubmit(onSubmit)}>
            <ButtonText className='font-medium'>{t('log in')}</ButtonText>
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
          <Text size='md'>{t("don't have an account?")}</Text>
          <Link href='/signup'>
            <LinkText className='font-medium text-primary-700' size='md'>
              {t('sign up')}
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}
