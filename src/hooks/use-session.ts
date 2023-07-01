import { useSession } from "next-auth/react"

export const useGetSession = () => {
    const session: any = useSession();
    return session.data?.user.id;
}