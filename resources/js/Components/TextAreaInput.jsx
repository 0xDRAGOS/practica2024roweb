import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextAreaInput({ className = '', isFocused = false, children, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'text-red-950 bg-yellow-600 border-none focus:border-yellow-400 focus:ring-yellow-400 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >{children}</textarea>
    );
});
