import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '@/utils/supabase'
import { Button, ButtonSpinner, ButtonText } from './ui/button'

export default function UploadAvatar() {
  const [uploading, setUploading] = useState(false)

  async function uploadAvatar() {
    try {
      setUploading(true)

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      })

      // User cancelled image picker.
      if (result.canceled || !result.assets || result.assets.length === 0)
        return

      const image = result.assets[0]

      if (!image.uri) {
        throw new Error('No image uri!') // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      )

      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
      const path = `${Date.now()}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (uploadError) {
        throw uploadError
      }

      const { error: updateProfileError } = await supabase.auth.updateUser({
        data: { avatar_url: data.path },
      })

      if (updateProfileError) {
        console.error('Error updating user:', updateProfileError.message)
      } else {
        console.log('User updated successfully:')
      }

      console.log('data', data)

      // onUpload(data.path)
    } catch (error) {
      console.log('error', error)
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <Button onPress={uploadAvatar}>
      {uploading ? <ButtonSpinner /> : null}
      <ButtonText>Upload</ButtonText>
    </Button>
  )
}
