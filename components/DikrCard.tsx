import { useEffect, useState } from 'react'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonIcon } from '@/components/ui/button'
import { Audio, AVPlaybackStatus } from 'expo-av'
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge'
import { Pause, Play, Repeat } from 'lucide-react-native'
import { Center } from '@/components/ui/center'

export default function DikrCard({
  text,
  count,
  audioUri,
}: {
  text: string
  count: number
  audioUri: string
}) {
  const [sound, setSound] = useState<Audio.Sound>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)

  async function playSound() {
    if (sound) {
      await sound.playAsync()
    } else {
      // console.log('Loading Sound')
      const { sound: s } = await Audio.Sound.createAsync({ uri: audioUri })
      setSound(s)

      // console.log('Playing Sound')
      await s.playAsync()
    }
  }

  async function _onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying)
      setIsBuffering(status.isBuffering)
      if (status.didJustFinish) {
        // console.log('Unloading Sound')
        sound?.unloadAsync().then(() => setSound(undefined))
      }
    }
    // console.log(status)
  }

  useEffect(() => {
    sound?.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)

    return sound
      ? () => {
          // console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <VStack className='bg-neutral-100 p-2 rounded-xl mb-8'>
      <Badge
        size='md'
        variant='solid'
        action='muted'
        className='self-baseline bg-neutral-200 rounded-lg mb-2'
      >
        <BadgeText>repeat {count}</BadgeText>
        <BadgeIcon as={Repeat} className='ml-2' />
      </Badge>

      <Text>{text}</Text>

      <Center className='-mb-7 bg-neutral-100 p-2 -ml-2 self-baseline rounded-full'>
        {isPlaying ? (
          <Button
            size='lg'
            className='rounded-full p-3.5 self-baseline aspect-square'
            onPress={async () => await sound?.pauseAsync()}
          >
            <ButtonIcon as={Pause} className='text-primary-50' />
          </Button>
        ) : (
          <Button
            size='lg'
            className='rounded-full p-3.5 self-baseline aspect-square'
            onPress={playSound}
            disabled={isBuffering}
          >
            <ButtonIcon as={Play} className='text-primary-50' />
          </Button>
        )}
      </Center>
    </VStack>
  )
}
