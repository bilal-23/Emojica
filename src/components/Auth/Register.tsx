import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Icons } from "@/components/ui/Icons";
import InputComponent from "./Register-Input";
import { buttonVariants } from "@/components/ui/Button";
import { useValidateRegisterForm } from "@/hooks/use-validate-register-form";

export interface error {
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

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); //1 First Name, Last Name, 2 Email,  Username, 3 Password,  Confirm Password
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<error>({ message: "", field: null });
  const { validateForm } = useValidateRegisterForm(setStep, setError);

  const handleInputChange = (
    value: string,
    type:
      | "firstName"
      | "lastName"
      | "email"
      | "username"
      | "password"
      | "confirmPassword"
  ) => {
    setError({ message: "", field: null });
    switch (type) {
      case "firstName":
        setFormData((p) => ({ ...p, firstName: value }));
        break;
      case "lastName":
        setFormData((p) => ({ ...p, lastName: value }));
        break;
      case "email":
        setFormData((p) => ({ ...p, email: value }));
        break;
      case "username":
        setFormData((p) => ({ ...p, username: value }));
        break;
      case "password":
        setFormData((p) => ({ ...p, password: value }));
        break;
      case "confirmPassword":
        setFormData((p) => ({ ...p, confirmPassword: value }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // VALIDATE FORM DATA
    const isValid = validateForm(formData);
    if (!isValid) return;
    // SUBMIT FORM
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
      className="relative pt-10"
    >
      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-0 top-0 px-1 py-0 hover:bg-transparent"
          )}
        >
          <Icons.chevronLeft className="h-4 w-4" />
        </button>
      )}
      <div className="grid gap-2">
        <div className="grid gap-4">
          {step === 1 && (
            <>
              <InputComponent
                error={error}
                handleInputChange={handleInputChange}
                id="firstName"
                isLoading={isLoading}
                label="First Name"
                placeholder="First name"
                type="text"
                value={formData.firstName}
              />
              <InputComponent
                error={error}
                handleInputChange={handleInputChange}
                id="lastName"
                isLoading={isLoading}
                label="Last Name"
                placeholder="Last name"
                type="text"
                value={formData.lastName}
              />
            </>
          )}
          {step === 2 && (
            <>
              <InputComponent
                error={error}
                handleInputChange={handleInputChange}
                id="email"
                isLoading={isLoading}
                label="Email"
                placeholder="name@example.com"
                type="email"
                value={formData.email}
              />
              <InputComponent
                error={error}
                handleInputChange={handleInputChange}
                id="username"
                isLoading={isLoading}
                label="Username"
                placeholder="attackhelicopter123"
                type="text"
                value={formData.username}
              />
            </>
          )}
          {step === 3 && (
            <>
              <InputComponent
                error={error}
                handleInputChange={handleInputChange}
                id="password"
                isLoading={isLoading}
                label="Password"
                placeholder="Password"
                type="password"
                value={formData.password}
              />
              <InputComponent
                error={error}
                handleInputChange={handleInputChange}
                id="confirmPassword"
                isLoading={isLoading}
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                value={formData.confirmPassword}
              />
            </>
          )}
          {error && (
            <p className="px-1 text-xs text-red-600">{error?.message}</p>
          )}
        </div>
        {step === 3 ? (
          <>
            <button
              className={cn(buttonVariants())}
              disabled={isLoading}
              type="submit"
              onClick={handleSubmit}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </button>
          </>
        ) : (
          <>
            <button
              className={cn(buttonVariants())}
              disabled={isLoading}
              type="button"
              onClick={() => setStep(step + 1)}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Next
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Register;
