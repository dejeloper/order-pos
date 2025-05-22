import { redirect } from "next/navigation";

export default function LoginPageRedirect() {
	return redirect("/auth/login");
}
