import axios from "axios";
import { toast } from "@/components/UI/use-toast";
import { hashPassword } from "@/lib/hashPassword";
import { signIn } from "next-auth/react";

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

    const login = async () => {
    }

    const logout = async () => {

    }

    const signup = async (formData: SignUpData) => {
        if (!setStep) return;
        if (setError) return;
        const hashedPassword = await hashPassword(formData.password);
        try {
            const response = await axios.post("/api/auth/register", { ...formData, password: hashedPassword });
            if (response.status === 201) {
                toast({
                    title: "Account Created",
                    description: "Your account has been created successfully",
                    variant: "default",
                })
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
        logout,
        signup
    }
}
