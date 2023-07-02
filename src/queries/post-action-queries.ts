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
            queryClient.refetchQueries(["all-posts"]); // Invalidate the user query
        },
        onError: () => {
            toast.error("Something went wrong while liking the post, please try again later");
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
            queryClient.refetchQueries(["all-posts"]); // Invalidate the user query
        },
        onError: () => {
            toast.error("Something went wrong while unliking the post, please try again later");
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
            // toast.success("Post bookmarked");
        },
        onError: () => {
            toast.error("Something went wrong while bookmarking the post, please try again later");
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
            // toast.success("Post unbookmarked");
        },
        onError: () => {
            toast.error("Something went wrong while unbookmarking the post, please try again later");
        }
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
            queryClient.invalidateQueries(["all-posts"]); // Invalidate the user query
            // toast.success("Post deleted successfully");
            console.log(router);
            if (router.pathname === `/post/[postId]`) {
                router.push("/");
            }
        },
        onError: () => {
            toast.error("Something went wrong while deleting the post, please try again later");
        }
    });
}

// Edit Post
export const useEditPostMutation = (postId: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ["editPost", postId],
        mutationFn: async ({ content }: { content: string }) => {
            const res = await axios.patch(`/api/post/${postId}`, { content });
            return true;
        },
        onError: () => {
            toast.error("Something went wrong while editing the post, please try again later");
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["feed-posts"]); // Invalidate the feed posts query
            queryClient.invalidateQueries(["bookmarks"])
            queryClient.invalidateQueries(["all-posts"]); // Invalidate the user query
            queryClient.invalidateQueries(["post", postId]); // Invalidate that individual post query
            toast.success("Post edited successfully");
        },
    });
}