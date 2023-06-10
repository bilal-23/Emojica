import { toast } from "@/components/ui/use-toast";
import { validate } from "@/lib/validate";
interface error {
    message: string;
    field:
    | "firstName"
    | "lastName"
    | "email"
    | "username"
    | "password"
    | "confirmPassword"
    | null;
}
type setStep = React.Dispatch<React.SetStateAction<number>>
type setError = React.Dispatch<React.SetStateAction<error>>
export const useValidateRegisterForm = (setStep: setStep, setError: setError) => {

    const validateForm = (formData: { firstName: string, lastName: string, username: string, email: string, password: string, confirmPassword: string }): Boolean => {
        const isFirstNameValid = validate.name(formData.firstName);
        if (!isFirstNameValid) {
            toast({
                title: "Invalid First Name",
                description: "Please enter a valid first name",
                variant: "destructive",
            });
            setStep(1);
            setError(p => {
                return { ...p, field: "firstName" }
            })
            return false;
        }
        const isLastNameValid = validate.name(formData.lastName);
        if (!isLastNameValid) {
            toast({
                title: "Invalid Last Name",
                description: "Please enter a valid last name",
                variant: "destructive",
            });
            setStep(1);
            setError(p => {
                return { ...p, field: "lastName" }
            })
            return false;
        }
        // VALIDATE EMAIL
        const isEmailValid = validate.email(formData.email);
        if (!isEmailValid) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email",
                variant: "destructive",
            });
            setStep(2);
            setError(p => {
                return { ...p, field: "email" }
            })
            return false;
        }
        // VALIDATE USERNAME
        const isUsernameValid = validate.username(formData.username);
        if (!isUsernameValid) {
            toast({
                title: "Invalid Username",
                description:
                    "Username must be at least 3 characters long, have no spaces, and no special characters",
                variant: "destructive",
            });
            setStep(2);
            setError(p => {
                return { ...p, field: "username" }
            })
            return false;
        }
        // VALIDATE PASSWORD
        const isPasswordValid = validate.password(formData.password);
        if (!isPasswordValid) {
            toast({
                title: "Invalid Password",
                description:
                    "Password must be at least 8 characters long, have at least one numeric digit",
                variant: "destructive",
            });
            setStep(3);
            setError(p => {
                return { ...p, field: "password" }
            })
            return false;
        }
        // VALIDATE CONFIRM PASSWORD
        const isConfirmPasswordValid =
            formData.password === formData.confirmPassword;
        if (!isConfirmPasswordValid) {
            toast({
                title: "Invalid Password",
                description: "Passwords do not match",
                variant: "destructive",
            });
            setStep(3);
            setError(p => {
                return { ...p, field: "confirmPassword" }
            })
            return false;
        }
        return true;
    }

    return { validateForm };

};