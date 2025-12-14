import clsx from "clsx";

const base = "inline-flex items-center justify-center rounded-md font-medium transition colors";

const variants = {
    default:
        "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
        "border border-border text-foreground hover:bg-border/40",
    subtle:
        "bg-surface text-foreground hover:bg-border",
    ghost:
        "text-foreground hover:bg-border/40",
    destructive:
        "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
};

export default function Button({
    children,
    size = "md",
    variant = "default",
    className,
    ...rest
}) {
    return (
        <button
            {...rest}
            className={clsx(base, variants[variant], sizes[size], className)}
        >
            {children}
        </button>
    );
}