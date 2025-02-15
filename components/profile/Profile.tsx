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
import { useTranslation } from 'react-i18next'
import { Icon } from '../ui/icon'
import { User } from 'lucide-react-native'

export default function Profile() {
  const session = use$(session$)
  const { t } = useTranslation()

  return session ? (
    <Center className='mt-6 w-full pb-4'>
      <Avatar size='xl'>
        <AvatarFallbackText className='text-primary-50'>
          {session.user.user_metadata.name}
        </AvatarFallbackText>
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
      <Avatar size='lg'>
        <Icon as={User} className='w-3/4 h-3/4 text-primary-50' />
      </Avatar>
      <VStack className='justify-center'>
        <Heading size='xl'>
          {t('Salaam Alikum')} <HelloWave />
        </Heading>

        <Text>
          {t('Tap to')}{' '}
          <Link href='/(auth)/login' className='text-primary-600 underline'>
            {t('Login to your account')}
          </Link>
        </Text>
      </VStack>
    </HStack>
  )
}
