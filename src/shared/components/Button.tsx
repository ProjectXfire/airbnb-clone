import styles from '@shared/styles/Button.module.scss';

interface Props {
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  text: string;
  icon?: JSX.Element | string;
  onClick?: () => void;
}

function Button({ text, icon, type, onClick, disabled = false }: Props): JSX.Element {
  return (
    <button
      className={`${styles['custom-button']} ${icon ? '' : styles['no-margin']} ${
        disabled ? styles.disabled : ''
      }`}
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
