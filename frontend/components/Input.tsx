export default function Input({ className = "", ...rest }) {
    return (
        <input
            {...rest}
            className={`
                w-full rounded-md border border-border bg-background px-3 py-2
                placeholder:text-foreground/50 focus:border-primary text-sm
                ${className}
            `}
        />
    );
}