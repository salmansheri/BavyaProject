import React from 'react'

const Form = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
        <div className="flex items-center gap-2 mb-2">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-900"
            >
            {labelName}

            </label>

            {isSurpriseMe && (
                <button
                    type="button"
                    onClick={handleSurpriseMe}
                    className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounder-[5px] text-black"
                >
                Surprise me

                </button>
            )}
        </div>
        <input 
            type={type}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounder-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
    </div>
  )
}

export default Form