import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

// get all post of the current logged in user
export const useGetMyPostsQuery = () => useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
        const response = await axios.get<{ posts: any[] }>("/api/user/my-posts");
        return response.data.posts;
    },
    onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
    }
});

// get all the bookmark post of the user
export const useGetBookmarksQuery = () => useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
        const response = await axios.get<{ bookmarks: any[] }>("/api/post/bookmark");
        return response.data.bookmarks;
    },
    onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
    }
})

// Mutate follow user
export const useFollowUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["follow-user"],
        mutationFn: async (userId: string) => {
            const response = await axios.post<{ message: string }>(`/api/user/follow`, { followId: userId });
            return response.data;
        },
        onSuccess: (data, userId) => {
            console.log(userId);
            queryClient.refetchQueries(["profile"]);
            queryClient.refetchQueries(["user", userId]);

        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message);
        }
    })
}

// Mutate unfollow user
export const useUnfollowUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["unfollow-user"],
        mutationFn: async (userId: string) => {
            const response = await axios.post<{ message: string }>(`/api/user/unfollow`, { unfollowId: userId });
            return response.data;
        },
        onSuccess: (data, userId) => {
            console.log(userId);
            queryClient.refetchQueries(["profile"]);
            queryClient.refetchQueries(["user", userId]);

        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message);
        }
    })
}