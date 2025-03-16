import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Toast, ToastDescription, useToast } from '@/components//ui/toast'
import { useTranslation } from 'react-i18next'

export default function CheckNetwork() {
  const [toastId, setToastId] = useState('0')
  const toast = useToast()
  const { t } = useTranslation()

  //check internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log('Connection type', state.type)
      // console.log('Is connected?', state.isConnected)
      handleToast(state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  function handleToast(isConnected: boolean | null) {
    if (!toast.isActive(toastId)) {
      showNewToast(isConnected)
    }
  }

  function showNewToast(isConnected: boolean | null) {
    const newId = isConnected ? 'online' : 'offline'
    setToastId(newId)

    toast.show({
      id: newId,
      placement: 'bottom',
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id
        return (
          <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
            <ToastDescription>
              {isConnected
                ? t("You're back online.")
                : t('No internet connection.')}
            </ToastDescription>
          </Toast>
        )
      },
    })
  }

  return null
}
