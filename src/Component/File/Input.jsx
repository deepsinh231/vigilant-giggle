import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    mt4 = "mt-4",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className={`w-full ${mt4}`}>
            {label && <label className='block text-sm text-gray-800 dark:text-gray-800'
                htmlFor={id}>
                {label}</label>}
            <input className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800
             dark:text-gray-300 dark:border-gray-600 focus:border-blue-400
                 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                 focus:ring focus:ring-opacity-40 ${className}`} type={type} ref={ref} {...props} id={id} />
        </div>
    )

})
export default Input;