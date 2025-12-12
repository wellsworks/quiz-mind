import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, apiLogout } from "./api";
import { redirect } from "next/navigation";


export function useUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });
}

export function useLogout() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: apiLogout,
        onSuccess: () => {
            qc.clear();
            redirect("/login")
        },
    });
}