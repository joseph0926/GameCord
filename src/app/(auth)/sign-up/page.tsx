"use client";

import React from "react";
import { AuthForm } from "@/components/forms/auth-form";
import { signUpSchema } from "@/schemas/auth.schema";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;
