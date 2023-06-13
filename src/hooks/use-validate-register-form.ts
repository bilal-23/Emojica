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
            setStep(1);
            setError(p => {
                return { message: "Please enter a valid first name", field: "firstName" }
            })
            return false;
        }
        const isLastNameValid = validate.name(formData.lastName);
        if (!isLastNameValid) {
            setStep(1);
            setError(p => {
                return { message: "Please enter a valid last name", field: "lastName" }
            })
            return false;
        }
        // VALIDATE EMAIL
        const isEmailValid = validate.email(formData.email);
        if (!isEmailValid) {
            setStep(2);
            setError(p => {
                return { message: "Please enter a valid email", field: "email" }
            })
            return false;
        }
        // VALIDATE USERNAME
        const isUsernameValid = validate.username(formData.username);
        if (!isUsernameValid) {
            setStep(2);
            setError(p => {
                return { message: "Username must be at least 3 characters long, have no spaces, and have no special characters", field: "username" }
            })
            return false;
        }
        // VALIDATE PASSWORD
        const isPasswordValid = validate.password(formData.password);
        if (!isPasswordValid) {
            setStep(3);
            setError(p => {
                return { message: "Password must be at least 8 characters long, have at least one numeric digit", field: "password" }
            })
            return false;
        }
        // VALIDATE CONFIRM PASSWORD
        const isConfirmPasswordValid =
            formData.password === formData.confirmPassword;
        if (!isConfirmPasswordValid) {
            setStep(3);
            setError(p => {
                return { message: "Passwords do not match", field: "confirmPassword" }
            })
            return false;
        }
        return true;
    }

    return { validateForm };

};