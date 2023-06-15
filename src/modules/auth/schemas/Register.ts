import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  name: Yup.string().min(1).required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, lowercase, number and special case character'
    )
    .required('Password is required')
});
