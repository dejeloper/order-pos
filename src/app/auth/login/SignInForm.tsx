"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {zodResolver} from "@hookform/resolvers/zod";

import {LoginData, loginSchema} from "@/schemas/auth/loginSchema";
import {loginService} from "@/services/auth";
import {useAuthStore} from "@/stores/authStore";

import PasswordField from "@/components/ui/PasswordField/PasswordField";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";

export default function SignInForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "Jhonatan",
      password: "Password01*",
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await loginService(data);

      if (result?.token) {
        useAuthStore.getState().setToken(result.token);
        toast.success("Inicio de sesión exitoso");
        router.push("/home");
      } else {
        toast.error("No se recibió un token válido del servidor");
        setError("root", {
          type: "manual",
          message: "No se recibió un token válido del servidor",
        });
        throw new Error("No se recibió un token válido del servidor");
      }
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error as {message?: string}).message
          : "Error inesperado";

      toast.error(message || "Error inesperado");

      setError("root", {
        type: "manual",
        message: message || "Error inesperado",
      });
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Usuario <span className="text-error-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="Usuario"
          autoComplete="username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-error-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Contraseña <span className="text-error-500">*</span>
        </Label>
        <PasswordField
          placeholder="Ingrese su contraseña"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-error-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Mantener mi sesión (No disponible)
          </label>
        </div>
        <Link
          href="/#reset-password"
          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          ¿Olvidó su contraseña?
        </Link>
      </div>

      {errors.root?.message && (
        <div className="text-sm text-error-500">{errors.root.message}</div>
      )}

      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Iniciando..." : "Iniciar"}
      </Button>
    </form>
  );
}
