'use client';

import React from 'react';
import { signUpWithCredentials } from '@/actions/auth.action';
import { AuthForm } from '@/components/auth/auth-form';
import { SignUpSchema } from '@/schemas/auth.schema';

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: '', password: '', name: '', username: '' }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
