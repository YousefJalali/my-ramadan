import { Fragment, useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from '@/components/ui/button'
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
import { supabase } from '@/utils/supabase'
// import { colors } from '@/components/ui/gluestack-ui-provider/config'
import colors from 'tailwindcss/colors'
import { session$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Redirect } from 'expo-router'

export default function PersonalInformation() {
  const session = use$(session$)

  if (!session) {
    return <Redirect href='/(protected)/(tabs)/settings' />
  }

  const {
    user: {
      email: storeEmail,
      user_metadata: { name: storeName },
    },
  } = session

  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [name, setName] = useState(storeName)
  const [email, setEmail] = useState(storeEmail)
  const [saving, setSaving] = useState(false)

  function closeAccordion() {
    if (name !== storeName || email !== storeEmail) {
      setShowAlertDialog(true)
    } else {
      setSelectedValues([])
    }
  }

  function openAccordion(item: string) {
    setSelectedValues([item])
  }

  function discardChanges(item: string) {
    if (item === 'name') setName(storeName)
    if (item === 'email') setEmail(storeEmail)
    setSelectedValues([])
    setShowAlertDialog(false)
  }

  async function submitHandler(field: string) {
    if (!email) return
    if (name.trim() === storeName && email.trim() === storeEmail) {
      setSelectedValues([])
      return
    }

    try {
      setSaving(true)
      const { data, error } = await supabase.auth.updateUser({
        ...(field === 'email' && { email: email }),
        ...(field === 'name' && { data: { name: name } }),
      })

      if (!data.user || error) throw error

      const {
        user: {
          email: updatedEmail,
          user_metadata: { name: updatedName },
        },
      } = data

      // if (field === 'name') {
      //   user$.name.set(updatedName)
      //   storeName = updatedName
      // }
      // if (updatedEmail && field === 'email') {
      //   user$.name.set(updatedEmail)
      //   storeEmail = updatedEmail
      // }

      setSelectedValues([])
    } catch (error) {
      setName(storeName)
      setEmail(storeEmail)
      console.log(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <VStack className=''>
      <Accordion
        size='md'
        variant='filled'
        type='single'
        isCollapsible={true}
        className='shadow-none p-0'
        value={selectedValues}
        onValueChange={(item) => setSelectedValues(item)}
      >
        {[
          { field: 'name', value: name, setValue: setName },
          { field: 'email', value: email, setValue: setEmail },
        ].map(({ field, value, setValue }) => (
          <Fragment key={field}>
            <AccordionItem value={field}>
              <AccordionHeader>
                <HStack className='items-start'>
                  <VStack className='flex-1' space='xs'>
                    <Text bold className='capitalize'>
                      {field}
                    </Text>
                    {selectedValues[0] === field ? (
                      <Text>Update your {field}</Text>
                    ) : (
                      <Text>{value}</Text>
                    )}
                  </VStack>
                  {selectedValues[0] === field ? (
                    <Button
                      variant='link'
                      onPress={closeAccordion}
                      disabled={saving}
                      className='group'
                    >
                      <ButtonText className='group-disabled:text-neutral-200'>
                        Cancel
                      </ButtonText>
                    </Button>
                  ) : (
                    <Button
                      variant='link'
                      onPress={() => openAccordion(field)}
                      disabled={
                        !!selectedValues[0]?.length &&
                        selectedValues[0] !== field
                      }
                      className='group'
                    >
                      <ButtonText className='group-disabled:text-neutral-200'>
                        Edit
                      </ButtonText>
                    </Button>
                  )}
                </HStack>
              </AccordionHeader>
              <AccordionContent className='p-0 my-4'>
                <FormControl>
                  <Input
                    variant='outline'
                    size='lg'
                    isDisabled={saving}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      value={value}
                      onChange={(e) => setValue(e.nativeEvent.text)}
                      placeholder={`Enter ${field} here...`}
                    />
                  </Input>

                  <FormControlError>
                    <FormControlErrorIcon />
                    <FormControlErrorText />
                  </FormControlError>
                </FormControl>

                <Button
                  className='w-fit self-start mt-4'
                  onPress={() => submitHandler(field)}
                >
                  {saving ? <ButtonSpinner color={colors.gray[50]} /> : null}
                  <ButtonText className='text-primary-50'>
                    {saving ? 'Saving...' : 'Save'}
                  </ButtonText>
                </Button>
              </AccordionContent>
            </AccordionItem>
            <Divider className='my-6' />
          </Fragment>
        ))}
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
