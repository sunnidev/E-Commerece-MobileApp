import { dummyUser } from '@/assets/assets'
import Header from '@/components/Header'
import { COLORS, PROFILE_MENU } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {

  const user = dummyUser
  const router = useRouter()

  const handleLogout = () => {  
    router.replace('/login')
  }
  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Profile' />

      <ScrollView className='flex-1 px-4 '
        showsVerticalScrollIndicator={false}
        contentContainerStyle={!user ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : { paddingTop: 16 }}
      >
        {!user ? (
          <View className='items-center w-full'>
            <View className='w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-6'>
              <Ionicons name='person' size={40} color={COLORS.secondary} />
            </View>
            <Text className='text-xl text-primary font-bold mb-2'>Guest User</Text>
            <Text className='text-center text-secondary mb-6'>Login to view your profile, orders and addresses.</Text>
            <TouchableOpacity className='bg-primary py-3 px-6 rounded-full' onPress={() => router.push('/login')}>
              <Text className='text-white font-bold text-lg'>Login / Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Profile Info */}
            <View className='items-center w-full'>
              <View className="mb-3">
                <Image source={{ uri: user.imageUrl }} className='size-20 border-2 border-white shadow-sm rounded-full' />
              </View>
              <Text className='text-xl font-bold text-primary'>{user.firstName + " " + user.lastName}</Text>
              <Text className='text-secondary text-sm'>{user.emailAddresses[0].emailAddress}</Text>

              {/* Admin Pannel Button */}
              {user.publicMetadata?.role === 'admin' && (
                <TouchableOpacity className='mt-4 bg-primary px-6 py-2 rounded-full' onPress={() => router.push('/admin')}>
                  <Text className='text-white font-bold'>Admin Pannel</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Menu */}
            <View className='bg-white rounded-xl border border-gray-100/75 p-2 mb-4 mt-6'>
              {PROFILE_MENU.map((item, index) => (
                <TouchableOpacity key={item.id} className={`flex-row items-center p-4 ${index !== PROFILE_MENU.length - 1 ? 'border-b border-gray-100' : ''}`} onPress={() => router.push(item.route as any)}>
                  <View className='w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'>
                    <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                  </View>
                  <Text className='text-primary text-lg'>{item.title}</Text>
                  <Ionicons name={'chevron-forward'} size={20} color={COLORS.secondary} />

                </TouchableOpacity>
              ))}
            </View>
              {/* Logout Button */}
              <TouchableOpacity className='bg-red-500 py-3 px-6 rounded-full items-center' onPress={handleLogout}>
                <Text className='text-white font-bold text-lg'>Logout</Text>
              </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile