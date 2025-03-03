import { SearchIcon, X } from 'lucide-react-native'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { use$, useObservable } from '@legendapp/state/react'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { ReactElement, useMemo } from 'react'
import { Pressable } from '@/components/ui/pressable'
import useColors from '@/hooks/useColors'

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

  const colors = useColors()

  const filteredList = useMemo(
    () =>
      list.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [list, query]
  )

  return (
    <>
      <Input variant='rounded' size='lg'>
        <InputSlot className='px-4'>
          <InputIcon as={SearchIcon} />
        </InputSlot>

        <InputField
          value={query}
          onChangeText={(text) => query$.set(text)}
          placeholder={placeholder}
          className='p-0'
        />

        {query.length ? (
          <InputSlot className='px-4'>
            <Pressable onPress={() => query$.set('')}>
              <InputIcon as={X} />
            </Pressable>
          </InputSlot>
        ) : null}
      </Input>

      {/* Loading Indicator */}
      {loading && (
        <Spinner
          size='small'
          className='my-8'
          color={colors['--color-primary-600']}
        />
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
