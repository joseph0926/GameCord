'use client';

import React from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { SignUpSchema } from '@/schemas/auth.schema';

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: '', password: '', name: '', username: '' }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;
