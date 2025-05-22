'use client';

import  { useState } from "react"; 
import Link from "next/link";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import PasswordField from "@/components/ui/PasswordField/PasswordField";

import {loginService} from "@/services/auth";

export default function SignInForm() {
  const [username, setUsername] = useState("Jhonatan");
  const [password, setPassword] = useState("Password01*"); 
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginService({ username, password });
      alert("Login exitoso");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Usuario <span className="text-error-500">*</span></Label>
        <Input
          type="text"
          placeholder="mi_usuario"
          defaultValue={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>

      <div>
        <Label>Contraseña <span className="text-error-500">*</span></Label>
        <PasswordField
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Mantener mi sesión
          </span>
        </div>
        <Link href="/reset-password" className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
          ¿Olvidó su contraseña?
        </Link>
      </div>

      {error && <div className="text-sm text-error-500">{error}</div>}

      <Button className="w-full" disabled={loading}>
        {loading ? "Iniciando..." : "Iniciar"}
      </Button>
    </form>
  );
}
