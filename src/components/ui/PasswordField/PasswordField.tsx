import { EyeIcon, EyeCloseIcon } from "@/icons";
import Input from "@/components/form/input/InputField";
import { useState } from "react";

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function PasswordField({ value, onChange, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange} 
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
      >
        {showPassword ? (
          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
        ) : (
          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
        )}
      </span>
    </div>
  );
}