import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import CartItem from '@/components/CartItem'

const Cart = () => {

  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const shipping =2.00
  const total = cartTotal + shipping

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Cart' showBack />
      {cartItems.length > 0 ? (
        <>
          <ScrollView className='flex-1 px-4 mt-2' showsVerticalScrollIndicator={false}>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => removeFromCart(item.id, item.size)}
                onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity, item.size)} />
            ))}
          </ScrollView>

          <View className='p-4 rounded-3xl shadow-sm bg-white'>
            <View className='flex-row justify-between mb-2'>
              <Text className='text-lg font-medium text-secondary'>Subtotal:</Text>
              <Text className='text-lg font-bold text-primary'>${cartTotal.toFixed(2)}</Text>
            </View>
            {/* Shipping */} 
            <View className='flex-row justify-between mb-2'>
              <Text className='text-lg font-medium text-secondary'>Shipping</Text>
              <Text className='text-lg font-bold text-primary'>${shipping.toFixed(2)}</Text>
            </View>
            <View className='h-[1px] bg-border mb-4' />
            <View className='flex-row justify-between mb-6'>
              <Text className='text-lg font-bold text-secondary'>Total:</Text>
              <Text className='text-lg font-bold text-primary'>${total.toFixed(2)}</Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity className='bg-primary py-3 rounded-full' onpress={() => router.push('/checkout')}>
              <Text className='text-white font-bold text-center'>Proceed to Checkout</Text>
            </TouchableOpacity>

          </View>
        </>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-lg text-secondary'>Your cart is empty</Text>
          <TouchableOpacity className='mt-4'>
            <Text className='text-primary font-bold' onPress={() => router.push('/')}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Cart