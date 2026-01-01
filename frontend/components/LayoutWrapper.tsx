import React from "react";

export default function LayoutWrapper({
    navbar, 
    children,
}: {
    navbar?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background text-foreground">
            {navbar}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}