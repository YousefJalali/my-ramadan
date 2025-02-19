import { SearchIcon } from 'lucide-react-native'
import { Input, InputField, InputIcon, InputSlot } from './ui/input'
import { use$, useObservable } from '@legendapp/state/react'
import { Spinner } from './ui/spinner'
import { colors } from './ui/gluestack-ui-provider/config'
import { Text } from '@/components/ui/text'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { ReactElement, useMemo } from 'react'

type Props<T extends { name: string }> = {
  loading: boolean
  error: string | null
  list: T[]
  children: (info: ListRenderItemInfo<T>) => ReactElement | null
  placeholder: string
}

export default function SearchableList<T extends { name: string }>({
  loading,
  error,
  list,
  children,
  placeholder,
}: Props<T>) {
  const query$ = useObservable('')
  const query = use$(query$)

  const filteredList = useMemo(
    () =>
      list.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [list, query]
  )

  return (
    <>
      <Input variant='rounded' size='lg'>
        <InputSlot className='pl-3'>
          <InputIcon as={SearchIcon} />
        </InputSlot>

        <InputField
          value={query}
          onChangeText={(text) => query$.set(text)}
          placeholder={placeholder}
        />
      </Input>

      {/* Loading Indicator */}
      {loading && (
        <Spinner size='small' color={colors.light['--color-primary-600']} />
      )}

      {/* Error Message */}
      {error && <Text>{error}</Text>}

      {/* City List */}
      {!loading && !error && (
        <FlashList
          className='mt-2'
          data={filteredList}
          renderItem={children}
          estimatedItemSize={250}
          ListEmptyComponent={<Text>No results found</Text>}
        />
      )}
    </>
  )
}
