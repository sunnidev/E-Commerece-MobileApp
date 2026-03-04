import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductCardProps } from '@/constants/types'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

const ProductCard = ({ product }: ProductCardProps) => {

    const isLiked = false // Example liked state

    return (
        <Link href={`/product/${product._id}`} asChild >
            <TouchableOpacity className='w-[48%] bg-white rounded-lg overflow-hidden mb-4'>
                <View className='relative h-56 w-full bg-gray-200'>
                    <Image source={{ uri: product.images[0] }} className='w-full h-full' resizeMode='cover' />
                    <TouchableOpacity className='absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm' onPress={(e) => e.stopPropagation()}>
                        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? COLORS.accent : COLORS.primary} />
                    </TouchableOpacity>

                    {product.isFeatured && (
                        <View className='absolute top-2 left-2 bg-black px-2 py-1 rounded'>
                            <Text className='text-white text-xs font-bold uppercase'>Featured</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View className='p-3'>
                    <View className='flex-row items-center mb-1'>
                        <Ionicons name='star' size={14} color={'#ffd700'} />
                        <Text className='text-xs text-secondary ml-1'>4.6 (120)</Text>
                    </View>
                    <Text className='text-sm font-bold text-primary mb-1' numberOfLines={1}>{product.name}</Text>
                    {/* <Text className='text-xs text-gray-500 mb-2'>{product.category}</Text> */}
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-sm font-bold text-secondary'>${product.price.toFixed(2)}</Text>
                        {/* <TouchableOpacity className='bg-primary px-3 py-1 rounded-full'>
                            <Text className='text-xs text-white font-bold'>Add to Cart</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default ProductCard