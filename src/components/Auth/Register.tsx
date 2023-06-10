import { buttonVariants } from "@/components/UI/Button";
import { Icons } from "@/components/UI/Icons";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1); //1 First Name, Last Name, 2 Email,  Username, 3 Password,  Confirm Password
  const [isLoading, setIsLoading] = useState();
  const [errors, setErrors] = useState({ message: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="relative pt-10">
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
              <Label className="sr-only" htmlFor="firstName">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
              <Label className="sr-only" htmlFor="lastName">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </>
          )}
          {step === 2 && (
            <>
              <Label className="sr-only" htmlFor="email">
                Email
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
              />
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                placeholder="attackhelicopter42"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </>
          )}
          {step === 3 && (
            <>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
              />
              <Label className="sr-only" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                aria-autocomplete="none"
                disabled={isLoading}
              />
            </>
          )}
          {errors && (
            <p className="px-1 text-xs text-red-600">{errors?.message}</p>
          )}
        </div>
        {step === 3 ? (
          <>
            <button className={cn(buttonVariants())} disabled={isLoading}>
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
