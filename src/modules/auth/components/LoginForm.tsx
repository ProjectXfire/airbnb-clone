'use client';

import { Form, Formik } from 'formik';
import { LoginSchema } from '@modules/auth/schemas';
import { type LoginUserDto } from '@modules/auth/dtos';

import { InputForm } from '@modules/auth/components';
import { Button } from '@/shared/components';

interface Props {
  onSubmit: (values: LoginUserDto) => void;
}

function LoginForm({ onSubmit }: Props): JSX.Element {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ getFieldProps, errors, touched, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <InputForm
            hasValue={!!values.email}
            name='email'
            type='email'
            placeholder='Email'
            register={getFieldProps}
            errorMessage={errors.email}
            error={!!errors.email && !!touched.email}
          />
          <InputForm
            hasValue={!!values.password}
            type='password'
            name='password'
            placeholder='Password'
            register={getFieldProps}
            errorMessage={errors.password}
            error={!!errors.password && !!touched.password}
          />
          <Button type='submit' text='Sign In' />
        </Form>
      )}
    </Formik>
  );
}
export default LoginForm;
