import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Like a post
export const useLikePostMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["likePost", postId],
        mutationFn: async () => {
            const res = await axios.post(`/api/post/like`, { postId });
            return res.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries(["post", postId]); // Invalidate that individual post query
            queryClient.refetchQueries(["feed-posts"]); // Invalidate the feed posts query
            queryClient.refetchQueries(["myPosts"]); // Invalidate the my posts query
            queryClient.refetchQueries(["all-posts"]); // Invalidate the user query
        }
    });
}

// Unlike a post
export const useUnlikePostMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["dislikePost", postId],
        mutationFn: async () => {
            const res = await axios.post(`/api/post/dislike`, { postId });
            return res.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries(["post", postId]); // Invalidate that individual post query
            queryClient.refetchQueries(["feed-posts"]); // Invalidate the feed posts query
            queryClient.refetchQueries(["myPosts"]); // Invalidate the my posts query
            queryClient.refetchQueries(["all-posts"]); // Invalidate the user query
        }
    });
}


// Bookmark post
export const useBookmarkPostMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["bookmarkPost", postId],
        mutationFn: async () => {
            const res = await axios.post(`/api/post/bookmark/${postId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries(["bookmarks"]);
            toast.success("Post bookmarked");
        }
    });
}

// Unbookmark post
export const useUnbookmarkPostMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["unbookmarkPost", postId],
        mutationFn: async () => {
            const res = await axios.delete(`/api/post/bookmark/${postId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries(["bookmarks"]);
            toast.success("Post unbookmarked");
        },
    });
}

// Delete post	
export const useDeletePostMutation = (postId: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ["deletePost", postId],
        mutationFn: async () => {
            const res = await axios.delete(`/api/post/${postId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["feed-posts"]); // Invalidate the feed posts query
            queryClient.invalidateQueries(["bookmarks"])
            queryClient.invalidateQueries(["myPosts"]); // Invalidate the my posts query
            queryClient.invalidateQueries(["all-posts"]); // Invalidate the user query
            toast.success("Post deleted successfully");
            router.push("/");
        }
    });
}