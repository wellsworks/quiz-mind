"use client";

import Link from "next/link";
import { useUser, useLogout } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Navbar() {
    useUser();
    const logout = useLogout();
    const router = useRouter();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                router.push("/login");
            },
        });
    };

    return (
        <nav>
            <NavigationMenu className="bg-background text-foreground">

                <div className="flex items-center justify-between py-4 px-4">
                <NavigationMenuList className="flex-row items-center space-x-4 text-sm">

                    <NavigationMenuItem>
                        <Link href="/dashboard" className="flex-row items center gap-2 hover:bg-background/50">
                            Dashboard
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" />

                    <NavigationMenuItem>
                        <Link href="/notes" className="flex-row items center gap-2"> 
                            Notes
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" />

                    <NavigationMenuItem>
                        <Link href="/study" className="flex-row items center gap-2"> 
                            Study
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" />

                    <NavigationMenuItem asChild>
                        <Button
                            size="default"
                            type="button"
                            variant="ghost"
                            onClick={handleLogout}
                        >
                            Logout <LogOut />
                        </Button>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" />
      
                </NavigationMenuList>
                </div>
            </NavigationMenu>
        </nav>
    );
}