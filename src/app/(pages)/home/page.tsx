
import PagesWrapper from "@/components/common/Wrapper";
import IsAuthenticated from "./isAuthenticated";

export default function HomePage() {
  const breadcrumbItems = [
    {name: "Home", href: "/"},
    {name: "Inicio"}
  ];


  return (
    <PagesWrapper breadcrumbItems={breadcrumbItems}>
      <h3 className="mb-2 font-semibold text-theme-xl sm:text-2xl text-center">
        Bienvenidos a la Página de Inicio
      </h3>

      <span>A continuación encontrará los accesos a las secciones más usadas de la aplicación.</span>
      <IsAuthenticated />

    </PagesWrapper>
  );
}
