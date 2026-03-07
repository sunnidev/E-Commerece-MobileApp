import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CartItemProps } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {

    const imageUrl = item.product.images[0]
    return (
        <View className='flex-row mb-4 bg-white p-3 rounded-xl'>
            <View className='w-20 h-20 bg-gray-100 rounded-lg mr-3 overflow-hidden'>
                <Image source={{ uri: imageUrl }} className='w-full h-full' resizeMode='cover' />
            </View>
            <View className='flex-1 justify-between'>
                {/* Product Details */}
                <View className='flex-row justify-between items-start'>
                    <View>
                        <Text className='text-sm font-medium text-primary mb-1'>{item.product.name}</Text>
                        <Text className='text-xs text-secondary'>size: {item.size}</Text>
                    </View>
                    <TouchableOpacity onPress={onRemove}>
                        <Ionicons name='close-circle-outline' size={20} color='#ff4c3b' />
                    </TouchableOpacity>
                </View>

                {/* Quantity and Price */}
                <View className='flex-row justify-between items-center mt-2'>
                    
                    <Text className='text-base font-bold text-primary'> ${(item.product.price * item.quantity).toFixed(2)}</Text>
                    <View className='flex-row items-center bg-surface rounded-full px-2 py-1'>
                        <TouchableOpacity onPress={() => onUpdateQuantity && onUpdateQuantity(item.quantity - 1)}className='p-1'>
                            <Ionicons name='remove' size={16} color={COLORS.primary} />
                        </TouchableOpacity>
                        <Text className='mx-3 text-primary font-medium'>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => onUpdateQuantity && onUpdateQuantity(item.quantity + 1)} className='p-1'>
                            <Ionicons name='add' size={16} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartItem