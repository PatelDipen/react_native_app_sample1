import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SignInFormData = {
  email: string;
  password: string;
};

export const useSignInForm = (initialValues?: Partial<SignInFormData>) => {
  const signinSchema = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email address')
      .trim(),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const form = useForm<SignInFormData>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
      ...initialValues,
    },
    mode: 'all',
  });

  return form;
};
