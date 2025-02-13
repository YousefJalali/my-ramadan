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
import { Divider } from '@/components/ui/divider'
import { Href, Link } from 'expo-router'
import { use$ } from '@legendapp/state/react'
import { user$ } from '@/store'
import Profile from '@/components/profile/Profile'
import LogoutBtn from '@/components/profile/LogoutBtn'

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

export default function Settings() {
  let user = use$(user$.email)

  return (
    <VStack className='h-full w-full my-12'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
          flexGrow: 1,
        }}
      >
        <VStack className='h-full w-full pb-8' space='2xl'>
          <Profile />

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
                  {list.map(({ iconName, endIcon, subText, path }, index) => {
                    //hide personal information
                    if (!user && subText === 'Personal Information') return null
                    return (
                      <React.Fragment key={index}>
                        <Link href={path}>
                          <HStack className='justify-between items-center w-full flex-1 py-3'>
                            <HStack className='items-center' space='lg'>
                              <Icon as={iconName} size='xl' />
                              <Text size='lg' className='text-neutral-900'>
                                {subText}
                              </Text>
                            </HStack>
                            <Icon as={endIcon} />
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

          <LogoutBtn />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
