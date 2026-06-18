import { ReactNode } from "react";

export default function Section({ 
    title, 
    children 
}: {
    title: ReactNode,
    children: ReactNode,
}) {
    return (
        <section className="space-y-4 mb-10">
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            {children}
        </section>
    );
}