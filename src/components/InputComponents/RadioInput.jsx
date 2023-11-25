import React from 'react'

function RadioInput({label, id, name, type, value, onChange, onBlur, style, checked}) {
  return (
    <>
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            checked={checked}
            className="mr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
        <label htmlFor="married">{label}</label><br></br>
    </>
  )
}

export default RadioInput