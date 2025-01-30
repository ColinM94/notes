import * as React from "react";

import { Button } from "components/button/button";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { account, ID } from "inits/backend";
// import { useAppStore } from "stores/appStore";
import { Icon } from "components/icon/icon";

import styles from "./styles.module.css";

export const Login = () => {
  // const { updateAppStore } = useAppStore();

  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);

  const handleLogin = async () => {
    try {
      await account.createMagicURLToken(
        ID.unique(),
        email,
        "http://localhost:5174/notes"
      );

      setIsSent(true);
    } catch (error) {
      alert(error);
    }
  };

  // const createSession = async () => {

  // };

  // React.useEffect(() => {
  //   createSession();
  // }, []);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        {isSent && (
          <div className={styles.confirmation}>
            <Icon icon="check" className={styles.confirmationIcon} />
            <div className={styles.confirmationText}>
              <div className={styles.confirmationTextHeading}>
                Link sent to {email}
              </div>
              <div className={styles.confirmationTextSubHeading}>
                You can close this tab
              </div>
            </div>
          </div>
        )}
        {!isSent && (
          <>
            <InputText
              value={email}
              setValue={setEmail}
              surface={1}
              className={styles.input}
            />

            <Button
              icon="send"
              label="Send Login Link"
              onClick={handleLogin}
              surface={1}
              className={styles.button}
            />
          </>
        )}
      </Card>
    </div>
  );
};
