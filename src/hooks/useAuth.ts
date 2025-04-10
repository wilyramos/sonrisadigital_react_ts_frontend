import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export const useAuth = () => {

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        user,
        isLoading,
        isError,
    };
}