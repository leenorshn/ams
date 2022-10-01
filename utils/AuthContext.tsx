import React, { createContext, useContext, useEffect, useState } from 'react';
import { signOut, signInWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import { auth } from './firebase';

export const AuthContext = createContext<UserContextType | null>(null);

type User = {
    uid: string,
    email: string,
    photoURL: string
    displayName: string

}

type Product = {
    id: string,
    name: string,
    code_bar: string,
    category: string,
    priceApro: number,
    priceOfSell: number,
    stock: number,
    stockMin: number
    date: number
}

type UserContextType = {
    currentUser: User | null
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
    product: Product | null
    setProduct: React.Dispatch<React.SetStateAction<Product | null>>
    loading: boolean
    login: Function
    logout: Function
    panier: Product[]
    setPanier: React.Dispatch<React.SetStateAction<Product[]>>
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null)
    const [panier, setPanier] = useState<Product[]>([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {

                setCurrentUser(user as User);
            }
            setLoading(false);
        });

        return unsubscribe();
    }, []);

    async function login(email, password) {
        setLoading(true);
        const resp = await signInWithEmailAndPassword(auth, email, password);
        if (resp.user) {
            setCurrentUser(resp.user as User);
            setLoading(false);
            return resp;
        } else {
            return null;
        }


    }

    async function logout() {
        setCurrentUser(null);
        await signOut(auth);
        console.log('logout');
        return;
    }


    const value = {
        currentUser,
        setCurrentUser,
        loading,
        product,
        setProduct,
        login,
        logout,
        panier,
        setPanier
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}