import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const WishListContext = createContext<WishlistContextType | undefined>(undefined)

export function WishListProvider({ children }: { children: ReactNode }) {

    const [wishlist, setWishlist] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const fetchwishlist = async () => {
        setLoading(true)
        setWishlist(dummyWishlist)
        setLoading(false)
    }

    const toggleWishlist = (product: Product) => {
        setWishlist((prev) => {
            const exists = prev.some(item => item._id === product._id)
            if (exists) {
                return prev.filter(item => item._id !== product._id)
            }
            return [...prev, product]
        })
    }

    const isInWishList = (productId: string) => {
        return wishlist.some(item => item._id === productId)
    }

    useEffect(() => {
        fetchwishlist()
    }, [])

    return (
        <WishListContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishList }}>
            {children}
        </WishListContext.Provider>
    )
}

export function useWishList() {
    const context = useContext(WishListContext)
    if (context === undefined) {
        throw new Error("useWishList must be used within a WishListProvider")
    }
    return context
}