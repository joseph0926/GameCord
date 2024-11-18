'use client';

import React from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { SignInSchema } from '@/schemas/auth.schema';

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: '', password: '' }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignIn;
