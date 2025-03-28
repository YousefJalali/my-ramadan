import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { colorMode$ } from '@/stores/store'
import { use$ } from '@legendapp/state/react'

export default function useColors() {
  const colorMode = use$(colorMode$)

  return colors[colorMode]
}
