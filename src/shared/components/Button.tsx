import styles from '@shared/styles/Button.module.scss';

interface Props {
  type: 'button' | 'submit' | 'reset';
  text: string;
  icon?: JSX.Element | string;
  onClick?: () => void;
}

function Button({ text, icon, type, onClick }: Props): JSX.Element {
  return (
    <button
      className={`${styles['custom-button']} ${icon ? '' : styles['no-margin']}`}
      type={type}
      onClick={onClick}
    >
      {typeof icon === 'string' && <img src={icon} alt={text} />}
      {typeof icon === 'object' && <div>{icon}</div>}
      <p>{text}</p>
    </button>
  );
}
export default Button;
