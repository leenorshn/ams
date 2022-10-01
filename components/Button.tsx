import React from 'react'

const Button = ({ label, color }) => {
    return (
        <div>
            <button
                type="button"
                className={"inline-flex items-center rounded-md border border-transparent  px-8 py-2 text-sm font-medium leading-4 text-white shadow-sm " + color}
            >
                {label}
            </button>
        </div>
    )
}

export default Button
