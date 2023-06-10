import React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { error } from "./Register";

interface Props {
  isLoading: boolean;
  error: error;
  value: string;
  handleInputChange: (
    value: string,
    type:
      | "firstName"
      | "lastName"
      | "email"
      | "username"
      | "password"
      | "confirmPassword"
  ) => void;
  label:
    | "First Name"
    | "Last Name"
    | "Email"
    | "Username"
    | "Password"
    | "Confirm Password";
  id:
    | "firstName"
    | "lastName"
    | "email"
    | "username"
    | "password"
    | "confirmPassword";
  placeholder: string;
  type: "text" | "email" | "password";
}

const InputComponent: React.FC<Props> = ({
  error,
  handleInputChange,
  id,
  isLoading,
  label,
  placeholder,
  type,
  value,
}) => {
  return (
    <>
      <Label className="sr-only" htmlFor="firstName">
        {label}
      </Label>
      <Input
        style={{
          borderColor: error.field === id ? "red" : "",
        }}
        id={id}
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        disabled={isLoading}
        required
        value={value}
        onChange={(e) => handleInputChange(e.target.value, id)}
      />
    </>
  );
};

export default InputComponent;
