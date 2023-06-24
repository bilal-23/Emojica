import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { profile } from "@/types/user";
// get profile of current logged in user
export const useGetProfileQuery = () => useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
        const response = await axios.get<{ profile: profile }>("/api/user/profile");
        return response.data.profile;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
    }
});