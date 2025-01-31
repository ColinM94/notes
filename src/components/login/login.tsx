import * as React from "react";

import { Button } from "components/button/button";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { pb } from "inits/backend";
import { useAppStore } from "stores/appStore";

import { LoginToggle } from "./components/loginToggle/loginToggle";

import styles from "./styles.module.css";

export const Login = () => {
  const { updateAppStore } = useAppStore();

  const [showSignIn, setShowSignIn] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handleSignIn = async () => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      updateAppStore({
        user: {
          id: authData.record.id,
          email,
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleSignUp = async () => {
    try {
      await pb.collection("users").create({
        email,
        password,
        passwordConfirm: password,
      });

      handleSignIn();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <form
          onSubmit={showSignIn ? handleSignIn : handleSignUp}
          className={styles.form}
        >
          <LoginToggle
            showSignIn={showSignIn}
            setShowSignIn={setShowSignIn}
            className={styles.toggles}
          />

          <InputText
            value={email}
            setValue={setEmail}
            surface={1}
            placeholder="Email"
          />

          <InputText
            value={password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
            surface={1}
          />

          {!showSignIn && (
            <InputText
              value={password2}
              setValue={setPassword2}
              placeholder="Re-type Password"
              type="password"
              surface={1}
            />
          )}

          {showSignIn && (
            <Button
              label="Sign In"
              onClick={handleSignIn}
              surface={1}
              className={styles.button}
            />
          )}

          {!showSignIn && (
            <Button
              label="Sign Up"
              onClick={handleSignUp}
              surface={1}
              className={styles.button}
            />
          )}
        </form>
      </Card>
    </div>
  );
};
