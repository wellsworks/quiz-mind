"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    login,
    register,
    getCurrentUser,
    logout,
} from "@/lib/api/client/auth";

export function useLogin() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            qc.resetQueries();
        }
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: register
    });
}

export function useUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const user = await getCurrentUser();
            return user;
        },
        retry: false,
    });
}

export function useLogout() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            qc.clear();
        },
    });
}