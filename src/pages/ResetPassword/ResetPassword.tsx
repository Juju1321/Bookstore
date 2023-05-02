import React, { useState, useEffect, useMemo } from "react";
import AuthContainer from "src/pages/AuthContainer";
import Input from "src/components/Input";
import Button from "src/components/Button";
import styles from "./ResetPassword.module.scss";
import { ButtonType } from "src/utils/@globalTypes";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { RoutesList } from "../Router";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const onChangeEmail = (value: string) => setEmail(value);

  const navigate = useNavigate();

  const onResetClick = (email: string) => () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/auth" })
      .then(() => setIsVisible(true))
      .catch(() => alert("Invalid user"));
  };

  const onGoToMainClick = () => navigate(RoutesList.Main);

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
          type={"text"}
          errorText={emailError}
          onBlur={onBlurEmail}
        />
        {isVisible ? (
          <Button
            title={"go to home"}
            disabled={!isValid}
            onClick={onGoToMainClick}
            type={ButtonType.Primary}
          />
        ) : (
          <Button
            title={"reset"}
            disabled={!isValid}
            onClick={onResetClick(email)}
            type={ButtonType.Primary}
          />
        )}
      </div>
    </AuthContainer>
  );
};

export default ResetPassword;
