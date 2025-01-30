import { Button } from "components/button/button";
import { useAppStore } from "stores/appStore";
import { account } from "inits/backend";

import styles from "./styles.module.css";

export const Settings = () => {
  const { updateAppStore } = useAppStore();

  const handleSignOut = () => {
    account.deleteSessions();

    updateAppStore({
      user: {
        id: "",
      },
    });
  };

  return (
    <div className={styles.container}>
      <Button label="Sign Out" onClick={handleSignOut} />
    </div>
  );
};
