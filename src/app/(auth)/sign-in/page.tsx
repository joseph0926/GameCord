"use client";

import React from "react";
import { AuthForm } from "@/components/forms/auth-form";
import { signInSchema } from "@/schemas/auth.schema";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignIn;
