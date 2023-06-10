import { buttonVariants } from "@/components/UI/Button";
import { Icons } from "@/components/UI/Icons";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState();
  const [errors, setErrors] = useState({ message: "" });
  const handleSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="grid gap-2">
        <div className="grid gap-4">
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            required
          />
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
          />
          <Label className="sr-only" htmlFor="confirmPassword">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            placeholder="******"
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            disabled={isLoading}
          />
          {errors && (
            <p className="px-1 text-xs text-red-600">{errors?.message}</p>
          )}
        </div>
        <button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
