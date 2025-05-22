"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import {  EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [username, setUsername] = useState("Jhonatan");
	const [password, setPassword] = useState("Password01*");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("http://localhost:8000/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			if (!res.ok) {
				throw new Error("Usuario o contraseña incorrectos");
			}
			const data = await res.json(); 
			alert("Login exitoso");
		} catch (err: any) {
			setError(err.message || "Error al iniciar sesión");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col flex-1 lg:w-1/2 w-full"> 
			<div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
				<div>
					<div className="mb-5 sm:mb-8">
						<h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
							Inicio de Sesión
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Ingresa tu usuario y contraseña para acceder a tu cuenta.
						</p>
					</div>
					<div>  
						<form onSubmit={handleSubmit}>
							<div className="space-y-6">
								<div>
									<Label>
										Usuario <span className="text-error-500">*</span> 
									</Label>
									<Input
										placeholder="mi_usuario"
										type="text"
										defaultValue={username}
										onChange={e => setUsername(e.target.value)}
									/> 
								</div>
								<div>
									<Label>
										Contraseña <span className="text-error-500">*</span> 
									</Label>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Ingrese su contraseña"
											defaultValue={password}
											onChange={e => setPassword(e.target.value)}
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
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Checkbox checked={isChecked} onChange={setIsChecked} />
										<span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
											Mantenter mi sesión
										</span>
									</div>
									<Link
										href="/reset-password"
										className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
									>
										Olvidó su contraseña?
									</Link>
								</div>
								{error && (
									<div className="text-error-500 text-sm">{error}</div>
								)}
								<div>
									<Button className="w-full" size="sm"   disabled={loading} onClick={()=>handleSubmit}>
										{loading ? "Iniciando..." : "Iniciar"}
									</Button>
								</div>
							</div>
						</form>

						<div className="mt-5">
							<p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
								¿No tiene cuenta? 
								<Link
									href="/signup"
									className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
								>
									Solicitar acceso
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
