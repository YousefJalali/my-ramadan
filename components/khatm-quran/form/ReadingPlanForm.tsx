import { useState } from 'react'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet'
import { Button, ButtonText } from '../../ui/button'
import { Heading } from '../../ui/heading'
import { Text } from '../../ui/text'
import { VStack } from '../../ui/vstack'
import LastReading from './LastReading'
import NextReading from './NextReading'

export default function ReadingPlanForm() {
  const [showActionsheet, setShowActionsheet] = useState(false)
  const [verseError, setVerseError] = useState<null | string>(null)

  const handleClose = () => {
    console.log('handleClose')
    setShowActionsheet(false)
    // reset()
  }

  function validateVerse() {
    // if (!juzIndex$.get() || !surahIndex$.get() || !verse$.get()) return
    // const range = QURAN_JUZ[+juzIndex$.get()].surah[+surahIndex$.get()].verses
    // if (+verse$.get() < range[0] || +verse$.get() > range[1]) {
    //   console.log('hors zone')
    //   setVerseError('hors zone')
    // } else {
    //   setVerseError(null)
    // }
  }

  return (
    <>
      <Button
        variant='link'
        className='self-baseline'
        onPress={() => setShowActionsheet(true)}
      >
        <ButtonText>Change</ButtonText>
      </Button>

      <Actionsheet
        isOpen={showActionsheet}
        onClose={handleClose}
        snapPoints={[50]}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack className='flex-1 pb-16 w-full'>
            <VStack className='my-4 w-full' space='sm'>
              <Heading size='2xl'>Update</Heading>
              <Text>update your quran reading</Text>
            </VStack>

            <VStack className='flex-1 mt-4' space='xs'>
              <LastReading />

              <NextReading />
            </VStack>

            <Button disabled={!!verseError}>
              <ButtonText>Save</ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
