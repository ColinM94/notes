import { Children } from "consts/general";
import { classes } from "utils/classes";

import styles from "./styles.module.css";

interface Props {
  className?: string;
  children: Children;
}

export const Card = (props: Props) => {
  const { className, children } = props;

  return <div className={classes(styles.container, className)}>{children}</div>;
};
