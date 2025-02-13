import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import React from 'react'

const policy = [
  {
    section: 'Introduction',
    content:
      'This Privacy Policy explains how we collect, use, and protect your information when you use the Ramadan Checklist 2025 app.',
  },
  {
    section: 'Information We Collect',
    content:
      'We may collect personal information such as your name, email, and app usage data to enhance your experience.',
  },
  {
    section: 'How We Use Your Information',
    content:
      'We use your data to provide and improve our services, personalize content, and communicate with you.',
  },
  {
    section: 'Sharing and Disclosure',
    content:
      'We do not sell your data. However, we may share it with third-party service providers for functionality and analytics purposes.',
  },
  {
    section: 'Data Security',
    content:
      'We implement security measures to protect your data but cannot guarantee absolute security.',
  },
  {
    section: 'Your Rights',
    content:
      'You may request access, modification, or deletion of your personal data by contacting us.',
  },
  {
    section: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy periodically. Any changes will be posted within the app.',
  },
  {
    section: 'Contact Us',
    content:
      'For any questions or concerns, contact us at [your contact email].',
  },
]

export default function PrivacyPolicy() {
  return (
    <VStack>
      {/* <Text>
        Welcome to <Text bold>Ramadan Checklist 2025</Text>. By using the App,
        you agree to the following Terms of Service. Please read them carefully.
      </Text> */}
      {policy.map(({ section, content }) => (
        <React.Fragment key={section}>
          <Heading className='mt-6'>{section}</Heading>
          <Text>{content}</Text>
        </React.Fragment>
      ))}
    </VStack>
  )
}
