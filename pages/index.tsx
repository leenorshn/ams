import { collection, onSnapshot, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import AppBar from '../components/AppBar';
import TableVente from '../components/TableVente';
import { db } from '../utils/firebase';

const Ventes = () => {

    const [commandes, setCommandes] = useState([])

    useEffect(() => {
        const q = query(collection(db, "commandes"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push({ ...doc.data(), id: doc.id });
            });
            // console.log(ops);

            setCommandes(ops);
        });
        return () => unsubscribe()

    }, []);
    return (
        <div>
            <AppBar title={"Nos ventes"} menu={(<div>
                <input type="text"
                    placeholder='Rechercher produit'
                    className='rounded-md placeholder:text-gray-500 -my-2' />
            </div>)} />
            <TableVente data={commandes} />
        </div>
    )
}

export default Ventes;