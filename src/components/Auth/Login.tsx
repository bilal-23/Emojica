import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { buttonVariants } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { Icons } from "@/components/UI/Icons";
import { Input } from "@/components/UI/Input";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Login() {
  const [isLoading, setIsLoading] = useState();
  const [errors, setErrors] = useState({ message: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
