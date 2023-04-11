import React, {useState} from "react";
import AuthContainer from "src/pages/AuthContainer";
import styles from "./NewPassword.module.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import {ButtonType} from "src/utils/@globalTypes";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onChangePassword = (value: string) => setPassword(value);
    const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);

  return <AuthContainer>
      <div className={styles.title}>new password</div>
      <div className={styles.infoContainer}>
          <div className={styles.inputContainer}>
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
          <Button title={"set password"} onClick={() => {}} type={ButtonType.Primary} />
      </div>
  </AuthContainer>;
};

export default NewPassword;
