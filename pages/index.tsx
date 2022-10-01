import Link from 'next/link';
import React from 'react'
import AppBar from '../components/AppBar';
import TableVente from '../components/TableVente';

const Ventes = () => {
    return (
        <div>
            <AppBar title={"Nos ventes"} menu={(<div>
                <input type="text"
                    placeholder='Rechercher produit'
                    className='rounded-md placeholder:text-gray-500 -my-2' />
            </div>)} />
            <TableVente />
        </div>
    )
}

export default Ventes;