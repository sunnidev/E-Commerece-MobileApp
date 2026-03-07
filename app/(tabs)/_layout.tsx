import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '@/context/CartContext'

const TabLayout = () => {

    const { cartItems } = useCart()
    return (
        <SafeAreaView className='flex-1' edges={['bottom']}>
            <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primary, tabBarInactiveTintColor: '#CDCDE0', tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0', height: 56, paddingTop: 8 } }} >
                <Tabs.Screen name='index' options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} /> }} />


                <Tabs.Screen name='cart' options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View className='relative'>
                            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={26} color={color} />
                            {cartItems.length > 0 && (
                                <View className='absolute -top-1 -right-2 bg-red-500 rounded-full w-5 h-5 justify-center items-center'>
                                    <Text className='text-white text-xs font-bold'>{cartItems.length}</Text>
                                </View>
                            )}
                        </View>
                    ) }} />

            <Tabs.Screen name='favourites' options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={26} color={color} /> }} />

            <Tabs.Screen name='profile' options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} /> }} />
        </Tabs>
        </SafeAreaView>
    )
}

export default TabLayout