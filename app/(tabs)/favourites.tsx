import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWishList } from '@/context/WishListContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import ProductCard from '@/components/ProductCard'

const Favourites = () => {

  const { wishlist } = useWishList()
  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Wishlist' showMenu showCart />

      {wishlist.length > 0 ? (
        <ScrollView className='flex-1 px-4 mt-4' showsVerticalScrollIndicator={false}>
          <View className='flex-row flex-wrap -mx-2'>
            {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))}
          </View>
            </ScrollView>
          ) : (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-lg text-secondary'>Your wishlist is empty</Text>
            <TouchableOpacity className='mt-4'>
              <Text className='text-primary font-bold' onPress={() => router.push('/')}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
      )}
        </SafeAreaView>
      )
}

      export default Favourites