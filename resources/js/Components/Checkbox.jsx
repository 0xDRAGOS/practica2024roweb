export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'bg-yellow-600 rounded border-none text-yellow-600 shadow-sm focus:ring-yellow-400 ' +
                className
            }
        />
    );
}
