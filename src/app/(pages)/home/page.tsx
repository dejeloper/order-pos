
import PagesWrapper from "@/components/common/Wrapper";
import IsAuthenticated from "./isAuthenticated";

export default function HomePage() {
  const breadcrumbItems = [
    {name: "Home", href: "/"},
    {name: "Inicio"}
  ];

  const title = "Bienvenidos a la Página de Inicio";
  const subtitle = "A continuación encontrará los accesos a las secciones más usadas de la aplicación.";

  return (
    <PagesWrapper breadcrumbItems={breadcrumbItems} title={title} subtitle={subtitle}>
      <IsAuthenticated />
    </PagesWrapper>
  );
}
