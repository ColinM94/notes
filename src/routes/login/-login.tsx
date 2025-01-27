import * as React from "react";

import { Button } from "components/button/button";
import { InputText } from "components/inputText/inputText";
import { account, ID } from "inits/backend";

export const Login = () => {
  const [email, setEmail] = React.useState("");

  const handleLogin = async () => {
    await account.createMagicURLToken(
      ID.unique(),
      email,
      "http://localhost:5174/notes"
    );
  };

  return (
    <div>
      <InputText value={email} setValue={setEmail} />
      <Button label="Send Login Link" onClick={handleLogin} />
    </div>
  );
};
