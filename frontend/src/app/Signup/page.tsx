"use client";

import { useState } from "react";
import EmailForm from "./_components/EmailForm";
import PasswordForm from "./_components/PasswordForm";
import Snowfall from "react-snowfall";

export default function SignupPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <Snowfall color="#82C3D9" />
      {step === "email" && (
        <EmailForm
          onNext={(email, username) => {
            setEmail(email);
            setUsername(username);
            setStep("password");
          }}
        />
      )}

      {step === "password" && (
        <PasswordForm email={email} username={username} onBack={() => setStep("email")} />
      )}
    </>
  );
}
