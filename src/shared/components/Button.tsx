import styles from '@shared/styles/Button.module.scss';
import { type MouseEvent } from 'react';

interface Props {
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  text: string;
  icon?: JSX.Element | string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
}

function Button({ text, icon, type, onClick, disabled = false, outline }: Props): JSX.Element {
  return (
    <button
      className={`${styles['custom-button']} ${icon ? '' : styles['no-margin']} ${
        disabled ? styles.disabled : ''
      } ${outline ? styles.outline : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {typeof icon === 'string' && <img src={icon} alt={text} />}
      {typeof icon === 'object' && <div>{icon}</div>}
      <p>{text}</p>
    </button>
  );
}
export default Button;
