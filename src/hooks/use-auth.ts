import axios from "axios";
import { toast as shadcnToast } from "@/components/UI/use-toast";
import { hashPassword } from "@/lib/hashPassword";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

interface Auth {
    setStep?: React.Dispatch<React.SetStateAction<number>>;
    setError?: any
}
export const useAuth = ({ setStep, setError }: Auth) => {
    const router = useRouter();


    const login = async ({ email, password }: { email: string, password: string }) => {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/"
        })
        if (result?.error) {
            toast.error
            shadcnToast({
                title: "Login Failed",
                description: result.error,
                variant: "destructive"
            })
        } else {
            toast.success("Login Successful");
            router.replace('/');
        }
    }


    const signup = async (formData: SignUpData) => {
        if (!setStep) return;
        if (!setError) return;
        const hashedPassword = await hashPassword(formData.password);
        try {
            const response = await axios.post("/api/auth/register", { ...formData, password: hashedPassword });
            if (response.status === 201) {
                shadcnToast({
                    title: "Account Created",
                    description: "Your account has been created successfully",
                    variant: "default",
                });
            }
        }
        catch (err: any) {
            const id = err.response.data.id;

            if (id === "email") {
                setError({ message: err.response.data.message, field: "email" })
            }
            else if (id === "username") {
                setError({ message: err.response.data.message, field: "username" })
            }
        }
    }


    return {
        login,
        signup
    }
}


