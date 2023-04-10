import React, { useState } from "react";
import styles from "src/components/SignUp/SignUp.module.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeName = (value: string) => setName(value);
  const onChangeEmail = (value: string) => setEmail(value);
  const onChangePassword = (value: string) => setPassword(value);
  const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Input
          title={"Name"}
          value={name}
          onChange={onChangeName}
          placeholder={"Your name"}
          type={"text"}
        />
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
        <Input
          title={"Confirm password"}
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          placeholder={"Confirm your password"}
          type={"password"}
        />
      </div>
      <Button title={"sign up"} onClick={() => {}} type={ButtonType.Primary} className={styles.button}/>
    </div>
  );
};

export default SignUp;
