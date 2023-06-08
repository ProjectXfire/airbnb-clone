import styles from '@modules/auth/styles/FooterForm.module.scss';

interface Props {
  text: string;
  actionText: string;
  onClick: () => void;
}

function FooterForm({ text, actionText, onClick }: Props): JSX.Element {
  return (
    <div className={styles['form-footer']}>
      <p>{text}</p>
      <button type='button' onClick={onClick}>
        {actionText}
      </button>
    </div>
  );
}
export default FooterForm;
