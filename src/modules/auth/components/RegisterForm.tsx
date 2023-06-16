'use client';

import { Form, Formik } from 'formik';
import { RegisterSchema } from '@modules/auth/schemas';
import { type NewUserDto } from '@modules/auth/dtos';
import { Button, InputForm } from '@/shared/components';

interface Props {
  onSubmit: (values: NewUserDto) => void;
  onLoading?: boolean;
}

function RegisterForm({ onSubmit, onLoading = false }: Props): JSX.Element {
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      {({ getFieldProps, errors, touched, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <InputForm
            hasValue={!!values.name}
            name='name'
            type='text'
            placeholder='Name'
            register={getFieldProps}
            errorMessage={errors.name}
            error={!!errors.name && !!touched.name}
          />
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
          <Button type='submit' text='Sign up' disabled={onLoading} />
        </Form>
      )}
    </Formik>
  );
}
export default RegisterForm;
