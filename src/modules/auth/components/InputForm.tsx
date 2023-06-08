import { type FieldInputProps } from 'formik';
import styles from '@modules/auth/styles/InputForm.module.scss';
import { type HTMLInputTypeAttribute } from 'react';

interface Props {
  hasValue: boolean;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  error: boolean;
  errorMessage: string | undefined;
  register: <Value = any>(props: any) => FieldInputProps<Value>;
}

function InputForm({
  name,
  placeholder,
  register,
  error,
  errorMessage,
  hasValue,
  type
}: Props): JSX.Element {
  return (
    <div className={styles['input-group']}>
      <input
        id={name}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...register(name)}
        type={type}
      />
      <label htmlFor={name} className={`${styles.label} ${hasValue ? styles['has-text'] : ''}`}>
        {placeholder}
      </label>
      {error && <span className={styles.span}>{errorMessage}</span>}
    </div>
  );
}
export default InputForm;
