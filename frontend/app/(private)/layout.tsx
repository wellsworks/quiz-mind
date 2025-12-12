import Navbar from "@/components/Navbar";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function PrivateLayout({ children }) {
    return <LayoutWrapper navbar={<Navbar /> }>{children}</LayoutWrapper>
}