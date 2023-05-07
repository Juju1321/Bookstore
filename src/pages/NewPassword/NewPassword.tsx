import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";

import Input from "src/components/Input";
import Button from "src/components/Button";
import { RoutesList } from "../Router";
import AuthContainer from "src/pages/AuthContainer";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./NewPassword.module.scss";

const NewPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const onChangePassword = (value: string) => setPassword(value);
  const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);
  const onBlurPassword = () => setPasswordTouched(true);


  useEffect(() => {
    if (passwordTouched) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords must match");
      } else if (password.length === 0 || confirmPassword.length === 0) {
        setPasswordError("Password is required field");
      } else {
        setPasswordError("");
      }
    }
  }, [confirmPassword, password, passwordTouched]);

  const onNewPasswordClick =
    (oobCode: string | null, newPassword: string) => () => {
      const auth = getAuth();
      if (oobCode)
        confirmPasswordReset(auth, oobCode, newPassword)
          .then(() => navigate(RoutesList.Auth))
          .catch(() => alert("Invalid password"));
    };

    const isValid = useMemo(() => {
      return (
        passwordError.length === 0 &&
        passwordTouched
      );
    }, [passwordError, passwordTouched]);

  return (
    <AuthContainer>
      <div className={styles.title}>new password</div>
      <div className={styles.infoContainer}>
        <div className={styles.inputContainer}>
          <Input
            title={"Password"}
            value={password}
            onChange={onChangePassword}
            placeholder={"Your password"}
            className={styles.input}
            type={"password"}
            errorText={passwordError}
            onBlur={onBlurPassword}
          />
          <Input
            title={"Confirm password"}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder={"Confirm your password"}
            className={styles.input}
            type={"password"}
            errorText={passwordError}
            onBlur={onBlurPassword}
          />
        </div>
        <Button
          title={"set password"}
          onClick={onNewPasswordClick(oobCode, password)}
          disabled={!isValid}
          type={ButtonType.Primary}
        />
      </div>
    </AuthContainer>
  );
};

export default NewPassword;
