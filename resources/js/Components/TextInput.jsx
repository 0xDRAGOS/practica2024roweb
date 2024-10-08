import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'text-red-950 bg-yellow-600 border-none focus:border-yellow-400 focus:ring-yellow-400 rounded-md shadow-sm' +
                className
            }
            ref={input}
        />
    );
});
