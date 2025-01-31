import { Button } from "components/button/button";
import { useAppStore } from "stores/appStore";
import { pb } from "inits/backend";

import styles from "./styles.module.css";

export const Settings = () => {
  const { updateAppStore } = useAppStore();

  const handleSignOut = () => {
    pb.authStore.clear();

    updateAppStore({
      user: {
        id: "",
        email: "",
      },
    });
  };

  return (
    <div className={styles.container}>
      <Button label="Sign Out" onClick={handleSignOut} />
    </div>
  );
};
