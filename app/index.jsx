import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Redirect , router } from 'expo-router';
import { images } from '@/constants';
import CustomButton from '../components/CustomButton';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider';


export default function App(){

  const{isLoading , isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
    <SafeAreaView className = 'bg-primary h-full'>
    <ScrollView contentContainerStyle={{height:'100%'}}>
    <View className ="w-full justify-center items-center
        min-h-full px-4"> 
        <Image
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode='contain'
          />

        <Image
          source={images.cards}
          className="maw-w-[380px] w-full h-[300px]"
          resizeMode='contain'
        
        />

      <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">
            Discover Endless Possibilitis with {' '}
            <Text className="text-secondary-200">
            Zeon
          </Text>
          </Text>

          <Image
            source={images.path}
            className ="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode='contais'
          
          />
          
        </View>

        <Text className="text-sm font-pregular
        text-gray-100 mt-7 text-center">
          Where creativity meets innovation: embark on a journey of
          limitless exploration with Zeon
        </Text>

        <CustomButton
          title="Continue with Email"
          handlePress={() =>router.push('/sign-in')}
          containerStyles='w-full mt-7'
        />

        </View>

       

    </ScrollView>
    <StatusBar backgroundColor='#161622'
    style='light'/>
    </SafeAreaView>
  )
}



