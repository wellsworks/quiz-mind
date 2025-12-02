import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./api";


const { data: user, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser
});