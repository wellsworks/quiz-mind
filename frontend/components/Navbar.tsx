"use client";

import Link from "next/link";
import { useUser, useLogout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/ui";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sun, Moon, LogOut } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useUIStore } from "@/store/ui";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Navbar() {
    useUser();
    const user = useAuthStore((s) => s.user);
    const logout = useLogout();
    const router = useRouter();

    const theme = useUIStore((s) => s.theme);
    const toggleTheme = useUIStore((s) => s.toggleTheme);

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                router.push("/login");
            },
        });
    };

    return (
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

                <NavigationMenuItem asChild>
                    <Toggle 
                        size="default" 
                        aria-label="Toggle Theme"
                        onClick={toggleTheme}
                    >
                        {theme === "dark" ? <Sun /> : <Moon />} 
                    </Toggle>
                </NavigationMenuItem>        
            </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}