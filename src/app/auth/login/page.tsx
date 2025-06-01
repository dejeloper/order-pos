import Link from "next/link";
import SignInForm from "./SignInForm";


export default function LoginPage() {
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
            <SignInForm />

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                ¿No tiene cuenta? &nbsp;
                <Link
                  href="/signup"
                  className="text-cyan-500 hover:text-cyan-600 dark:text-cyan-400"
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
