import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OrderPos",
  description: "Signin",
};

export default function SignIn() {
  return <SignInForm />;
}
