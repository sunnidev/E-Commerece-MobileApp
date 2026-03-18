import { View, Text, ActivityIndicator, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Product } from '@/constants/types'
import { useCart } from '@/context/CartContext'
import { useWishList } from '@/context/WishListContext'
import { dummyProducts } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'

const { width } = Dimensions.get('window')

const ProductDetails = () => {

    const { id } = useLocalSearchParams()
    const router = useRouter()

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const { addToCart, cartItems, itemCount } = useCart()
    const { toggleWishlist, isInWishList } = useWishList()

    const fetchProductDetails = async () => {
        const foundProduct: any = dummyProducts.find(p => p._id === id)
        setProduct(foundProduct || null)
        setLoading(false)
    }

    useEffect(() => {
        fetchProductDetails()
    }, [id])

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        )
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text className="text-lg font-semibold">Product not found</Text>
            </SafeAreaView>
        )
    }

    const isLiked = isInWishList(product._id)

    const handleAddToCart = () => {
        if (!selectedSize) {
            Toast.show({
                type: 'info',
                text1: 'No size selected',
                text2: 'Please select a size before adding to cart',
            })
            return
        }
        addToCart(product, selectedSize || '')

    }

    return (
        <SafeAreaView className="flex-1 mb-3 bg-white" edges={['bottom']}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Images Carousel */}
                <View className='relative h-[450px] bg-gray-100 mb-6'>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => {
                            const index = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width)
                            setActiveImageIndex(index)
                        }}
                    >
                        {product.images?.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={{ width: width, height: 450 }} resizeMode='cover' />
                        ))}
                    </ScrollView>
                    {/* Header actions */}
                    <View className="absolute top-10 left-4 right-4 flex-row justify-between items-center">
                        <TouchableOpacity className="w-10 h-10 p-2 bg-white/80 rounded-full items-center justify-center" onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-10 h-10 p-2 bg-white/80 rounded-full items-center justify-center" onPress={() => toggleWishlist(product)}>
                            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? COLORS.accent : COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    {/* Pagination Dot */}
                    <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
                        {product.images?.map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 rounded-full ${index === activeImageIndex ? 'w-6 bg-primary' : 'bg-gray-300 w-2'}`} />
                        ))}
                    </View>
                </View>

                {/* Product Info */}
                <View className="px-5">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-2xl font-bold mb-2">{product.name}</Text>
                        <View className="flex-row justify-between items-start mb-2">
                            <Ionicons name="star" size={14} color={'#ffd700'} />
                            <Text className="text-sm font-bold ml-1">4.6</Text>
                            <Text className="text-xs text-secondary ml-1">(128)</Text>
                        </View>
                    </View>
                    <Text className="text-xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</Text>
                    {
                        product.sizes && product.sizes.length > 0 && (
                            <>
                                <Text className="text-base font-bold text-primary mb-3">Select Size</Text>
                                <View className='flex-row gap-3 mb-6 flex-wrap'>
                                    {product.sizes.map((size, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            className={`w-12 h-12 rounded-full items-center justify-center border ${selectedSize === size ? 'border-primary bg-primary' : 'border-gray-100 bg-white'} rounded-full`}
                                            onPress={() => setSelectedSize(size)}
                                        >
                                            <Text className={`text-sm font-medium ${selectedSize === size ? 'text-white' : 'text-primary'}`}>{size}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )
                    }
                    <Text className="text-base font-bold text-primary mb-3">Description</Text>
                    <Text className="text-secondary leading-6 mb-6 ">{product.description}</Text>
                </View>
            </ScrollView>

            {/* Footer */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex-row">
                <TouchableOpacity
                    className="w-4/5 bg-primary py-4 rounded-full flex-row items-center justify-center shadow-lg"
                    onPress={handleAddToCart}
                >
                    <Ionicons name="bag-outline" size={20} color={'#fff'} />
                    <Text className='text-white font-bold text-base ml-2'>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-1/5 py-3 flex-row justify-center relative"
                    onPress={() => router.push('/(tabs)/cart')}
                >
                    <Ionicons name="cart-outline" size={24} />
                    <View className='absolute top-2 right-4 size-4 z-10 bg-black rounded-full justify-center items-center'>
                        <Text className="text-xs text-white ">{itemCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetails