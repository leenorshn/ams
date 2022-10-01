import React, { createContext, useContext, useEffect, useState } from 'react';
import { signOut, signInWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import { auth } from './firebase';

export const BasketContext = createContext<BasketContextType | null>(null);



type Product = {
    id: string,
    name: string,
    code_bar: string,
    category: string,
    priceApro: number,
    priceOfSell: number,
    quantity: number,
    date: number
}

type BasketContextType = {
    panier: Product[]
    setPanier: React.Dispatch<React.SetStateAction<Product[]>>
    deleteProduct: Function,
    addInPanier: Function,
    totalPanier: Function

}


export function BasketProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [panier, setPanier] = useState<Product[]>([])

    const deleteProduct = (id) => {
        var p = panier.filter(p => p.id !== id);
        setPanier(p);
    }

    const totalPanier = () => {
        var t = 0
        for (var i = 0; i < panier.length; i++) {
            t = t + (panier[i].priceOfSell * panier[i].quantity);
        }

        return t;
    }

    const addInPanier = (p: Product) => {
        setPanier([p, ...panier])
    }

    const value = {
        panier,
        setPanier,
        deleteProduct,
        addInPanier,
        totalPanier
    };

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket() {
    return useContext(BasketContext);
}