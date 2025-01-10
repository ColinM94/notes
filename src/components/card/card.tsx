import { Children } from "consts/general";

import styles from "./styles.module.css";

interface Props {
  children: Children;
}

export const Card = (props: Props) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};
