import React from 'react'

function CheckInput({ label, id, name, type, value, onChange, onBlur, touched, error, style }) {
    return (
        <>
            <div className='flex'>
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className='inline'
                />
                <label htmlFor={id} className='inline ml-2 text-sm font-medium leading-6 text-gray-900'>
                    {label}
                </label>
            </div>
        </>
    )
}

export default CheckInput