import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profile } from "@/types/user";
import { Post } from "@/types/post";

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
// export const useGetMyPostsQuery = () => useQuery({
//     queryKey: ["myPosts"],
//     queryFn: async () => {
//         const response = await axios.get<{ posts: Post[] }>("/api/user/my-posts");
//         return response.data.posts;
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//         toast.error(error.response?.data.message);
//     },
//     staleTime: 1000 * 30, // 30 seconds
//     refetchOnMount: true
// });

// get all the bookmark post of the user
export const useGetBookmarksQuery = () => useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
        const response = await axios.get<{ bookmarks: Post[] }>("/api/post/bookmark");
        return response.data.bookmarks;
    },
    onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchOnMount: true
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
            queryClient.refetchQueries(["profile"]);
            queryClient.refetchQueries(["user", userId]);
            queryClient.refetchQueries(["feed-posts"]);

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
            queryClient.refetchQueries(["profile"]);
            queryClient.refetchQueries(["user", userId]);
            queryClient.refetchQueries(["feed-posts"]);

        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message);
        }
    })
}



// Edit Profile
export const useEditProfileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["edit-profile"],
        mutationFn: async (formData: {
            firstName: string,
            lastName: string,
            username: string,
            email: string,
            link: string,
            bio: string,
            pic: string;
        }) => {
            const response = await axios.patch<{ message: string }>(`/api/user/update`, formData);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries(["profile"]);
            queryClient.refetchQueries(["feed-posts"]);
            queryClient.refetchQueries(["all-posts"]);
            queryClient.refetchQueries(["bookmarks"]);
            toast.success("Profile Updated");
        }
    });
}