import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-yellow-300 text-yellow-600 focus:border-yellow-200 '
                    : 'border-transparent text-yellow-600 hover:border-yellow-200 focus:text-yellow-800 focus:border-yellow-200 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
