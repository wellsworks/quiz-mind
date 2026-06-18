import { ReactNode } from "react";

export default function PageHeader({ 
    title, 
    description 
}: {
    title: ReactNode,
    description: ReactNode,
}) {
    return (
        <header className="mb-8 space-y-2">
            <h1 className="text-3xl font-semibold">{title}</h1>
            {description && (
                <p className="text-foreground/70 text-sm">{description}</p>
            )}
        </header>
    );
}