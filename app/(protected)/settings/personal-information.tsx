import { useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Input, InputField } from '@/components/ui/input'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '@/components/ui/form-control'
import { Divider } from '@/components/ui/divider'
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/components/ui/alert-dialog'
import { Heading } from '@/components/ui/heading'
import { observer, use$, useObservable } from '@legendapp/state/react'
import { store$ } from '@/store'

const NAME = 'John Doe'

export default function PersonalInformation() {
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [name, setName] = useState(NAME)

  const email = use$(store$.email)
  console.log(email)

  function closeAccordion() {
    if (name !== NAME) {
      setShowAlertDialog(true)
    } else {
      setSelectedValues([])
    }
  }

  function openAccordion(item: string) {
    setSelectedValues([item])
  }

  function discardChanges(item: string) {
    if (item === 'name') setName(NAME)
    setSelectedValues([])
    setShowAlertDialog(false)
  }

  return (
    <VStack className=''>
      <Accordion
        size='md'
        variant='filled'
        type='single'
        isCollapsible={true}
        isDisabled={false}
        className='shadow-none p-0'
        value={selectedValues}
        onValueChange={(item) => setSelectedValues(item)}
      >
        <AccordionItem value='name'>
          <AccordionHeader>
            <HStack className='items-start'>
              <VStack className='flex-1' space='xs'>
                <Text bold>Name</Text>
                {selectedValues[0] === 'name' ? (
                  <Text>Update your name</Text>
                ) : (
                  <Text>{name}</Text>
                )}
              </VStack>
              {selectedValues[0] === 'name' ? (
                <Button variant='link' onPress={closeAccordion}>
                  <ButtonText>Cancel</ButtonText>
                </Button>
              ) : (
                <Button variant='link' onPress={() => openAccordion('name')}>
                  <ButtonText>Edit</ButtonText>
                </Button>
              )}
            </HStack>
          </AccordionHeader>
          <AccordionContent className='p-0 my-4'>
            <FormControl>
              <Input
                variant='outline'
                size='lg'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  value={name}
                  onChange={(e) => setName(e.nativeEvent.text)}
                  placeholder='Enter Name here...'
                />
              </Input>

              <FormControlError>
                <FormControlErrorIcon />
                <FormControlErrorText />
              </FormControlError>
            </FormControl>

            <Button className='w-fit self-start mt-4' onPress={closeAccordion}>
              <ButtonText className='text-primary-50'>Save</ButtonText>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <Divider className='my-6' />
      </Accordion>

      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        size='md'
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className='font-semibold' size='md'>
              Unsaved changes
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className='mt-3 mb-4'>
            <Text size='sm'>
              Are you sure you want to discard your unsaved changes?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className=''>
            <Button
              variant='outline'
              action='secondary'
              onPress={() => setShowAlertDialog(false)}
              size='sm'
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              variant='outline'
              action='negative'
              size='sm'
              onPress={() => discardChanges(selectedValues[0])}
            >
              <ButtonText className='text-error-600'>Discard</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  )
}
