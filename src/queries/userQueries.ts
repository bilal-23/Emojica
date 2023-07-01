import axios, { AxiosError } from 'axios'
import { toast } from "react-toastify";
import { useQuery } from '@tanstack/react-query'
import { allUsers } from '../types/user';

// This query will fetch all users and returns an array of users, excluding the profile of the logged in user
export const useGetAllUserQuery = () => useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
        const response = await axios.get<{ users: allUsers[] }>("/api/user");
        return response.data;
    },
    staleTime: 1000 * 60 * 5,// 5 minutes
    onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
    }
})

// Get Single User Detail
export const useGetUserQuery = (userId: string) => useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
        const response = await axios.get<{ user: allUsers }>(`/api/user/${userId}`);
        return response.data.user;
    }
});

// Get All Post of a User
export const useGetUserPostQuery = (userId: string) => useQuery({
    queryKey: ["user-post", userId],
    queryFn: async () => {
        const response = await axios.get<{ posts: any }>(`/api/user/all-posts/${userId}`);
        return response.data.posts;
    }
});