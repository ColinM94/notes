import { Button } from "components/button/button";
import { loadNotes } from "services/database/loadNotes";
import { classes } from "utils/classes";
import { useAppStore } from "stores/appStore";

import { Props } from "./types";
import styles from "./styles.module.css";

export const Header = (props: Props) => {
  const { className } = props;

  const { user } = useAppStore();

  const handleRefresh = () => {
    loadNotes();
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.email}>
        {user.email || "colin.maher94@gmail.com"}
      </div>

      <Button
        icon="refresh"
        onClick={handleRefresh}
        surface={1}
        className={styles.refreshButton}
      />
    </div>
  );
};
