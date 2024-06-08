import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'

const Create = () => {

const[uploading , setUploading] = useState(false)

const[form , setForm] = useState({
  title: '',
  video : null,
  thumbnail:null,
  prompt: ''

})


  return (
    <SafeAreaView className = " bg-primary h-full">
      <ScrollView className="px-4 my-16">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({...form , title:e})}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity>
            {form.video?(
              <Video 
                source={{uri: form.video.uri}}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ):(
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className="w-1/2 h-1/2"
    
                  /> 
                </View>


              </View>

            )}
          </TouchableOpacity>



        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default Create