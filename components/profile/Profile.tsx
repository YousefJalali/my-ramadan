import { user$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Center } from '../ui/center'
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar'
import UploadAvatar from '../UploadAvatar'
import { VStack } from '../ui/vstack'
import { Text } from '@/components/ui/text'
import { supabaseUrl } from '@/utils/supabase'
import { HStack } from '../ui/hstack'
import { Heading } from '../ui/heading'
import { Link } from 'expo-router'
import { HelloWave } from '../HelloWave'

export default function Profile() {
  let user = use$(user$.email)

  return user ? (
    <Center className='mt-6 w-full pb-4'>
      <Avatar size='xl'>
        <AvatarFallbackText>Jane Doe</AvatarFallbackText>
        <AvatarImage
          alt='Profile Image'
          height={200}
          width={200}
          source={{
            uri: `${supabaseUrl}/storage/v1/object/public/avatars/${use$(
              user$.avatar
            )}`,
          }}
        />
      </Avatar>
      <UploadAvatar />
      <VStack className='gap-1 w-full items-center'>
        <Text size='2xl' className='font-roboto text-dark'>
          {use$(user$.name)}
        </Text>
        <Text className='font-roboto text-sm'>United States</Text>
      </VStack>
    </Center>
  ) : (
    <HStack className='mx-6 mt-12' space='md'>
      <Avatar size='lg'></Avatar>
      <VStack>
        <Heading size='xl'>
          Salaam Alikum <HelloWave />
        </Heading>

        <Text>
          Tap to{' '}
          <Link href='/(auth)/login' className='text-primary-600 underline'>
            Login to your account
          </Link>
        </Text>
      </VStack>
    </HStack>
  )
}
