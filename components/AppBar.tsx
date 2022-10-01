import React from 'react'

const AppBar = ({ title, menu }) => {
    return (
        <header className='flex px-5 py-4 justify-between items-center bg-slate-600'>
            <h2 className='text-lg font-medium text-white'>{title}</h2>
            <nav className='flex space-x-4'>
                {menu}
            </nav>
        </header>
    )
}

export default AppBar
