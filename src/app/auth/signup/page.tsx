import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OrderPos",
  description: "SignUp" 
};

export default function SignUp() {
  return <SignUpForm />;
}
