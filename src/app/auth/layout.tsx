import Link from "next/link";
import Image from "next/image";
import {ThemeProvider} from "@/context/ThemeContext";

import {Toaster} from "react-hot-toast";

import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-cyan-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">

              <GridShape />
              <div className="flex flex-col items-center max-w-xs">
                <Link href="/" className="block mb-4">
                  <Image
                    priority
                    width={231}
                    height={63}
                    src="/images/logo/logo-dark.png"
                    alt="Logo"
                    style={{aspectRatio: "955/261"}}
                  />
                </Link>
                <p className="text-center text-gray-400 dark:text-white/60">
                  OrderPOS: Control total de tu negocio, fácil, seguro y al instante
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}
