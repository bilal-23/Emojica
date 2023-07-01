import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Create a new post
export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-post"],
        mutationFn: async (formData: { content: string, imageUrl?: string }) => {
            const response = await axios.post<{ message: string }>(`/api/post`, formData);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries(["myPosts"]);
            queryClient.refetchQueries(["feed-posts"]);
            toast.success("Post created successfully");
        }
    });
}

// Get post detail
export const useGetPostQuery = (postId: string) => useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
        const response = await axios.get<{ post: Post }>(`/api/post/${postId}`);
        return response.data.post;
    }
});

// Get Feed Posts
export const useGetFeedPostsQuery = () => useQuery({
    queryKey: ["feed-posts"],
    queryFn: async () => {
        const response = await axios.get<{ feedPosts: Post[] }>(`/api/post/my-feed`);
        return response.data.feedPosts;
    }
});