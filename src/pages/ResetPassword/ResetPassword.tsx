import React, { useState, useEffect, useMemo } from "react";
import AuthContainer from "src/pages/AuthContainer";
import Input from "src/components/Input";
import Button from "src/components/Button";
import styles from "./ResetPassword.module.scss";
import { ButtonType } from "src/utils/@globalTypes";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const onChangeEmail = (value: string) => setEmail(value);

  useEffect(() => {
    if (email.length === 0 && emailTouched) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email, emailTouched]);

  const onBlurEmail = () => {
    setEmailTouched(true);
  };

  const isValid = useMemo(() => {
    return emailTouched;
  }, [emailTouched]);

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
          errorText={emailError}
          onBlur={onBlurEmail}
        />
        <Button
          title={"reset"}
          disabled={!isValid}
          onClick={() => {}}
          type={ButtonType.Primary}
        />
      </div>
    </AuthContainer>
  );
};

export default ResetPassword;
