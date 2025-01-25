import { Children } from "consts/general";
import { classes } from "utils/classes";

import styles from "./styles.module.css";

interface Props {
  label?: string;
  value: string;
  surface?: 0 | 1 | 2;
  setValue: (value: string) => void;
  className?: string;
}

export const InputText = (props: Props) => {
  const { value, setValue, label, surface = 0, className } = props;

  return (
    <label className={styles.container}>
      {label}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classes(styles.input, `surface${surface}`)}
      />
    </label>
  );
};
