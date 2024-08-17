import { forwardRef, useRef } from 'react';

export default forwardRef(function SelectInput({ className = '', children, ...props }, ref) {
    const input = ref ? ref : useRef();


    return (
        <select
            {...props}
            className={
                'text-red-950 bg-yellow-600 border-none focus:border-yellow-400 focus:ring-yellow-400 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
});
