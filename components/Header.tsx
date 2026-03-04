import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { HeaderProps } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

const Header = ({ title, showBack, showSearch, showCart, showMenu, showLogo }: HeaderProps) => {

    const router = useRouter()
    const { itemCount } = { itemCount: 6 } // Example item count value


    return (
        <View className='flex-row items-center justify-between px-4 py-3 bg-white'>

            {/* Left Side */}
            <View className='flex-row items-center flex-1'>
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} className='mr-3'>
                        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                )}

                {showMenu && (
                    <TouchableOpacity className='mr-3'>
                        <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
                    </TouchableOpacity>
                )}

                {showLogo ? (
                    <View className='flex-1'>
                        <Image
                            source={require('@/assets/logo.png')}
                            style={{ width: '100%', height: 24 }}
                            resizeMode='contain'
                        />
                    </View>
                ) : title && (
                    <Text className='text-xl font-bold text-primary text-center flex-1 mr-8'>
                        {title}
                    </Text>
                )}

                {(!title && !showSearch) && <View className='flex-1' />} {/* Spacer if no title or logo */}
            </View>

            {/* Right Side */}
            <View className='flex-row items-center gap-4'>
                {
                    showSearch && (
                        <TouchableOpacity>
                            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    )}
                {
                    showCart && (
                        <TouchableOpacity onPress={()=> router.push('/(tabs)/cart')}>
                            <Ionicons name="bag-outline" size={24} color={COLORS.primary} />
                            <View className='absolute -top-2 -right-2 bg-accent rounded-full w-5 h-5 items-center justify-center'>
                                <Text className='text-white text-xs font-bold'>{itemCount}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

            </View>

        </View>
    )
}

export default Header