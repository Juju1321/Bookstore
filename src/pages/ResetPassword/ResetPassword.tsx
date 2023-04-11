import React, { useState } from "react";
import AuthContainer from "src/pages/AuthContainer";
import Input from "src/components/Input";
import Button from "src/components/Button";
import styles from "./ResetPassword.module.scss";
import { ButtonType } from "src/utils/@globalTypes";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const onChangeEmail = (value: string) => setEmail(value);

  return (
    <AuthContainer>
      <div className={styles.title}>reset password</div>
        <div className={styles.infoContainer}>
      <Input
        title={"Email"}
        value={email}
        onChange={onChangeEmail}
        placeholder={"Your email"}
        type={"text"}
      />
      <Button title={"reset"} onClick={() => {}} type={ButtonType.Primary} />
    </div>
    </AuthContainer>
  );
};

export default ResetPassword;
