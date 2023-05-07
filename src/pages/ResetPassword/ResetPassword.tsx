import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Input from "src/components/Input";
import Button from "src/components/Button";
import AuthContainer from "src/pages/AuthContainer";
import { ButtonType } from "src/utils/@globalTypes";
import { RoutesList } from "../Router";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = (value: string) => setEmail(value);
  const onGoToMainClick = () => navigate(RoutesList.Main);
  const onBlurEmail = () => setEmailTouched(true);

  const onResetClick = (email: string) => () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/auth" })
      .then(() => setIsVisible(true))
      .catch(() => alert("Invalid user"));
  };

  useEffect(() => {
    if (email.length === 0 && emailTouched) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email, emailTouched]);

  const isValid = useMemo(() => {
    return emailTouched;
  }, [emailTouched]);

  return (
    <AuthContainer>
      <div className={styles.title}>reset password</div>
      <div className={styles.infoContainer}>
        {isVisible && (
          <div className={styles.receiveEmail}>
            You will receive an email{" "}
            <span className={styles.currentEmail}>{email}</span> with a link to
            reset your password!
          </div>
        )}
        <Input
          title={"Email"}
          value={email}
          onChange={onChangeEmail}
          placeholder={"Your email"}
          className={styles.input}
          type={"text"}
          errorText={emailError}
          onBlur={onBlurEmail}
        />
        <Button
          title={isVisible ? "go to home" : "reset"}
          disabled={!isValid}
          onClick={isVisible ? onGoToMainClick : onResetClick(email)}
          type={ButtonType.Primary}
        />
      </div>
    </AuthContainer>
  );
};

export default ResetPassword;
