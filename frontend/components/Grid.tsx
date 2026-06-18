import { ReactNode } from "react";

export function Grid({ children }: { children: ReactNode }) {
    return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function GridFull({ children }: { children: ReactNode }) {
    return <div className="grid gap-6 grid-cols-1">{children}</div>; 
}

export function GridAuto({ children }: { children: ReactNode }) {
    return <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}