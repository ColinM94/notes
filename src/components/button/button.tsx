import { classes } from "utils/classes";
import { Props } from "./types";

import styles from "./styles.module.css";
import { Icon } from "components/icon/icon";

export const Button = (props: Props) => {
  const { icon, label, onClick, className, iconClassName, labelClassName } =
    props;

  return (
    <button onClick={onClick} className={classes(className, styles.container)}>
      {icon && (
        <Icon icon={icon} className={classes(styles.icon, iconClassName)} />
      )}
      <div className={classes(styles.label, labelClassName)}>{label}</div>
    </button>
  );
};
