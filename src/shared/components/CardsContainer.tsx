import styles from '../styles/CardsContainer.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function CardsContainer({ children }: Props): JSX.Element {
  return <ul className={styles['cards-container']}>{children}</ul>;
}
export default CardsContainer;
