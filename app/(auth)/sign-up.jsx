import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'

import {createUser} from '../../lib/appwrite'


const SignUp = () => {

  const[form , setForm] = useState({
    username:'',
    email:'',
    password:''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async() =>{

    console.log("submitting 1")

    if(!form.username || !form.email || !form.password){
      Alert.alert('Error' , 'Please fill in all the fields')
    }
  //  setisSubmitting(true)
  console.log("submitting 2")

    try{
      console.log('in')
      const result =await createUser(
        form.email,
        form.password,
        form.username
      )

      console.log("submitted")
     

      //set it to global state

      router.replace('/home')

    }catch(error){
      Alert.alert('Error' , error.message)
    }finally{
      // setisSubmitting(false)
    }

  }

  return (
  <SafeAreaView className = "bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center  min-h-[95vh] px-4 my-6">
        <Image
          source ={images.logo}
          resizeMode='contain'
          className="w-[115px] h-[35px]"
          />

          <Text className ="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up to Zeon
          </Text>

          <FormField
            title ="Username"
            value = {form.username}
            handleChangeText = {(e) => setForm({
              ...form,username:e
            })}
            otherStyles = "mt-7"
            
          />

          <FormField
            title ="Email"
            value = {form.email}
            handleChangeText = {(e) => setForm({
              ...form,email:e
            })}
            otherStyles = "mt-7"
            keyboardTyp= "email-addres"
          />

          <FormField
            title ="Password"
            value = {form.password}
            handleChangeText = {(e) => setForm({
              ...form,password:e
            })}
            otherStyles = "mt-7"
           
          />

          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row'>
              <Text className = 'text-lg text-gray-100 font-pregular'>
                Have an account already? {' '}
              </Text>

              <Link href="sign-in" className='text-lg font-psemibold text-secondary'>
                 Sign In
              </Link>
            </View>

      </View>
    </ScrollView>

  </SafeAreaView>
  )
}

export default SignUp