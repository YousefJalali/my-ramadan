import React from 'react'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import {
  Bell,
  BookText,
  ChevronRight,
  CircleUserRound,
  Languages,
  type LucideIcon,
} from 'lucide-react-native'
import { Icon } from '@/components/ui/icon'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ScrollView } from '@/components/ui/scroll-view'
import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar'
import { SafeAreaView } from '@/components/ui/safe-area-view'
import { Center } from '@/components/ui/center'
import { Divider } from '@/components/ui/divider'
import { Href, Link } from 'expo-router'
import { supabase } from '@/utils/supabase'
import { Toast, ToastDescription, useToast } from '@/components/ui/toast'

type Section = {
  sectionTitle: string
  list: {
    iconName: LucideIcon
    subText: string
    endIcon: LucideIcon
    path: Href
  }[]
}

const sections: Section[] = [
  {
    sectionTitle: 'Settings',
    list: [
      {
        iconName: CircleUserRound,
        subText: 'Personal Information',
        endIcon: ChevronRight,
        path: '/settings/personal-information',
      },
      {
        iconName: Languages,
        subText: 'Language',
        endIcon: ChevronRight,
        path: '/',
      },
      {
        iconName: Bell,
        subText: 'Notifications',
        endIcon: ChevronRight,
        path: '/',
      },
    ],
  },
  {
    sectionTitle: 'Legal',
    list: [
      {
        iconName: BookText,
        subText: 'Terms of Service',
        endIcon: ChevronRight,
        path: '/',
      },
      {
        iconName: BookText,
        subText: 'Privacy Policy',
        endIcon: ChevronRight,
        path: '/',
      },
    ],
  },
]

const MainContent = () => {
  const toast = useToast()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.show({
        id: '' + Math.random(),
        placement: 'bottom',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
              <ToastDescription>
                Error Signing Out User, {error.message}
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }

  return (
    <VStack className='h-full w-full mb-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
          flexGrow: 1,
        }}
      >
        <VStack className='h-full w-full pb-8' space='2xl'>
          <Center className='mt-6 w-full pb-4'>
            <VStack space='lg' className='items-center'>
              <Avatar size='2xl' className='bg-primary-600'>
                <AvatarImage
                  alt='Profile Image'
                  height={100}
                  width={100}
                  source={require('@/assets/images/icon.png')}
                />
                <AvatarBadge />
              </Avatar>
              <VStack className='gap-1 w-full items-center'>
                <Text size='2xl' className='font-roboto text-dark'>
                  Alexander Leslie
                </Text>
                <Text className='font-roboto text-sm text-typograpphy-700'>
                  United States
                </Text>
              </VStack>

              {/* <Button
                variant='outline'
                action='secondary'
                onPress={() => setShowModal(true)}
                className='gap-3 relative'
              >
                <ButtonText className='text-dark'>Edit Profile</ButtonText>
                <ButtonIcon as={Settings} />
              </Button> */}
            </VStack>
          </Center>
          <VStack className='mx-6' space='2xl'>
            {/* invite */}
            <HStack
              className='py-5 px-6 rounded-xl bg-neutral-100 justify-between items-center'
              space='2xl'
            >
              <HStack space='2xl' className='items-center'>
                <VStack>
                  <Text className='text-typography-900 text-lg' size='lg'>
                    Invite & get rewards
                  </Text>
                  <Text className='font-roboto text-sm '>
                    Your code r45dAsdeK8
                  </Text>
                </VStack>
              </HStack>
              <Button className='bg-primary-400 active:bg-background-0'>
                <ButtonText className='text-primary-50 text-sm'>
                  Invite
                </ButtonText>
              </Button>
            </HStack>

            {/* App Settings */}
            {sections.map(({ sectionTitle, list }) => (
              <VStack key={sectionTitle}>
                <Heading className='font-roboto mt-6 mb-3' size='xl'>
                  {sectionTitle}
                </Heading>
                <VStack className='justify-between items-center'>
                  {list.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Link
                          href={item.path}
                          onPress={() => console.log(item.path)}
                        >
                          <HStack className='justify-between items-center w-full flex-1 py-3'>
                            <HStack className='items-center' space='lg'>
                              <Icon as={item.iconName} size='xl' />
                              <Text size='lg' className='text-neutral-900'>
                                {item.subText}
                              </Text>
                            </HStack>
                            <Icon as={item.endIcon} />
                          </HStack>
                        </Link>
                        {list.length - 1 !== index && (
                          <Divider className='my-1' />
                        )}
                      </React.Fragment>
                    )
                  })}
                </VStack>
              </VStack>
            ))}
          </VStack>

          <Button variant='link' action='negative' onPress={handleLogout}>
            <ButtonText>Log out</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

export default function Profile() {
  return (
    <SafeAreaView className='h-full w-full my-10'>
      <MainContent />
    </SafeAreaView>
  )
}
