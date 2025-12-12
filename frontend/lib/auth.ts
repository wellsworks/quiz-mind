"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, apiLogout } from "./api";
import { useAuthStore } from "@/store/ui";

export function useUser() {
    const setUser = useAuthStore((s) => s.setUser);

    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const user = await getCurrentUser();
            setUser(user);
            return user;
        },
        retry: false,
    });
}

export function useLogout() {
    const qc = useQueryClient();
    const logoutStore = useAuthStore((s) => s.logout);

    return useMutation({
        mutationFn: apiLogout,
        onSuccess: () => {
            logoutStore();
            qc.clear();
        },
    });
}