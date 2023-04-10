import React, { useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./SignIn.module.scss";
import { NavLink } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (value: string) => setEmail(value);
  const onChangePassword = (value: string) => setPassword(value);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Input
          title={"Email"}
          value={email}
          onChange={onChangeEmail}
          placeholder={"Your email"}
          type={"text"}
        />
        <Input
          title={"Password"}
          value={password}
          onChange={onChangePassword}
          placeholder={"Your password"}
          type={"password"}
        />
      </div>
      <NavLink to={RoutesList.Main} className={styles.forgotPass}>
        Forgot password?
      </NavLink>
      <Button title={"sign in"} onClick={() => {}} type={ButtonType.Primary} />
    </div>
  );
};

export default SignIn;
