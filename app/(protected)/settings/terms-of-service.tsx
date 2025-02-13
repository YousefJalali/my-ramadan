import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import React from 'react'
import { ScrollView } from 'react-native'

const terms = [
  {
    section: 'Acceptance of Terms',
    content:
      'By accessing or using the App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the App.',
  },
  {
    section: 'Use of the App',
    content:
      'The App is designed to help users manage their Ramadan activities and checklist. You agree to use the App only for lawful purposes and in accordance with these Terms. You must not misuse the App or attempt to interfere with its functionality.',
  },
  {
    section: 'User Accounts',
    content:
      'Some features of the App may require account creation. You are responsible for maintaining the confidentiality of your login credentials. We reserve the right to suspend or terminate your account if you violate these Terms.',
  },
  {
    section: 'Privacy Policy',
    content:
      'Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your information.',
  },
  {
    section: 'Intellectual Property',
    content:
      'All content, trademarks, and intellectual property within the App are owned by us or our licensors. You may not reproduce, modify, or distribute any part of the App without permission.',
  },
  {
    section: 'Disclaimer of Warranties',
    content:
      "The App is provided 'as is' and 'as available' without warranties of any kind. We do not guarantee that the App will be error-free or uninterrupted.",
  },
  {
    section: 'Limitation of Liability',
    content:
      'We shall not be liable for any indirect, incidental, or consequential damages arising from the use of the App.',
  },
  {
    section: 'Modifications to Terms',
    content:
      'We may update these Terms at any time. Changes will be posted in the App, and continued use after changes constitutes acceptance.',
  },
  {
    section: 'Contact Us',
    content:
      'For any questions or concerns regarding these Terms, contact us at [your contact email].',
  },
]

export default function TermsOfService() {
  return (
    <VStack>
      <Text>
        Welcome to <Text bold>Ramadan Checklist 2025</Text>. By using the App,
        you agree to the following Terms of Service. Please read them carefully.
      </Text>
      {terms.map(({ section, content }) => (
        <React.Fragment key={section}>
          <Heading className='mt-6'>{section}</Heading>
          <Text>{content}</Text>
        </React.Fragment>
      ))}
    </VStack>
  )
}
