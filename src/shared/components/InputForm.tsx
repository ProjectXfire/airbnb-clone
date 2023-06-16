import styles from '@shared/styles/InputForm.module.scss';
import { type FieldInputProps } from 'formik';
import { type HTMLInputTypeAttribute } from 'react';

interface Props {
  hasValue: boolean;
  name: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  inputType?: 'textbox' | 'textarea';
  placeholder: string;
  error?: boolean;
  errorMessage?: string | undefined;
  register: <Value = any>(props: any) => FieldInputProps<Value>;
}

function InputForm({
  name,
  placeholder,
  register,
  disabled = false,
  error = false,
  inputType = 'textbox',
  errorMessage,
  hasValue,
  type = 'text'
}: Props): JSX.Element {
  return (
    <div className={styles['input-group']}>
      {inputType === 'textarea' ? (
        <textarea
          disabled={disabled}
          {...register(name)}
          className={`${styles.input} ${error ? styles.error : ''}`}
          cols={30}
          rows={10}
        ></textarea>
      ) : (
        <input
          id={name}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...register(name)}
          type={type}
        />
      )}
      <label htmlFor={name} className={`${styles.label} ${hasValue ? styles['has-text'] : ''}`}>
        {placeholder}
      </label>
      {error && <span className={styles.span}>{errorMessage}</span>}
    </div>
  );
}
export default InputForm;
