import {EyeIcon, EyeCloseIcon} from "@/icons";
import {Input} from "../input";
import {useState, forwardRef} from "react";
import type {InputHTMLAttributes} from "react";

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement>;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({...props}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          {...props}
          ref={ref}
          autoComplete="current-password"
        />
        <button
          type="button"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 bg-transparent border-0 p-0"
          tabIndex={0}
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
          )}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
