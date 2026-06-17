import Navbar from "@/components/Navbar";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ReactNode } from "react";

export default function PrivateLayout({ 
    children,
 }: {
    children: ReactNode;
 }) {
    return (
        <LayoutWrapper navbar={<Navbar /> }>
            {children}
        </LayoutWrapper>
    );
}