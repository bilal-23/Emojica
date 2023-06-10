import { Metadata } from "next";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "../../components/ui/Label";
import { Icons } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { buttonVariants } from "@/components/ui/Button";
import { validate } from "@/lib/validate";
import { toast } from "../ui/use-toast";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState();
  const [errors, setErrors] = useState({ message: "" });

  const handleInputChange = (value: string, field: "password" | "email") => {
    if (field === "password") {
      setFormData((p) => ({ ...p, password: value }));
    }
    if (field === "email") {
      setFormData((p) => ({ ...p, email: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate Email And Password
    const isPasswordValid = validate.password(formData.password);
    if (!isPasswordValid) {
      return toast({
        title: "Invalid Password",
        description:
          "Password must be at least 8 characters long, have at least one numeric digit and one speciall character.",
        variant: "destructive",
      });
    }

    const isEmailValid = validate.email(formData.email);
    if (!isEmailValid) {
      return toast({
        title: "Invalid Email",
        description: "Please enter a valid email",
        variant: "destructive",
      });
    }

    // EMAIL AND PASSWORD ARE VALID
    // SIGN IN
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="pt-10">
      <div className="grid gap-2">
        <div className="grid gap-4">
          <Label className="sr-only" htmlFor="email">
            Name
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            required
            value={formData.email}
            onChange={(e) => handleInputChange(e.target.value, "email")}
          />
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="******"
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            required
            value={formData.password}
            onChange={(e) => handleInputChange(e.target.value, "password")}
          />
          {errors && (
            <p className="px-1 text-xs text-red-600">{errors?.message}</p>
          )}
        </div>
        <button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </button>
      </div>
    </form>
  );
}

{
  /*  */
}
