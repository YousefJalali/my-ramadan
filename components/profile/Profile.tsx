import { session$ } from '@/store'
import { Center } from '../ui/center'
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar'
import UploadAvatar from './UploadAvatar'
import { VStack } from '../ui/vstack'
import { Text } from '@/components/ui/text'
import { supabaseUrl } from '@/utils/supabase'
import { HStack } from '../ui/hstack'
import { Heading } from '../ui/heading'
import { Link } from 'expo-router'
import { HelloWave } from '../HelloWave'
import { use$ } from '@legendapp/state/react'

export default function Profile() {
  const session = use$(session$)

  return session ? (
    <Center className='mt-6 w-full pb-4'>
      <Avatar size='xl'>
        <AvatarFallbackText>Jane Doe</AvatarFallbackText>
        <AvatarImage
          alt='Profile Image'
          height={200}
          width={200}
          source={{
            uri: `${supabaseUrl}/storage/v1/object/public/avatars/${session.user.user_metadata.avatar_url}`,
          }}
        />
        <UploadAvatar />
      </Avatar>
      <Text size='2xl' className='mt-2 text-neutral-950'>
        {session.user.user_metadata.name}
      </Text>
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
