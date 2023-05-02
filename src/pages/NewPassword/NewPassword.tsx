import React, { useState, useEffect } from "react";
import AuthContainer from "src/pages/AuthContainer";
import styles from "./NewPassword.module.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RoutesList } from "../Router";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangePassword = (value: string) => setPassword(value);
  const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

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

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const oobCode = searchParams.get("oobCode");

  const onNewPasswordClick =
    (oobCode: string | null, newPassword: string) => () => {
      const auth = getAuth();
      if (oobCode)
        confirmPasswordReset(auth, oobCode, newPassword)
          .then(() => navigate(RoutesList.Auth))
          .catch(() => alert("Invalid password"));
    };

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
            type={"password"}
            errorText={passwordError}
            onBlur={onBlurPassword}
          />
          <Input
            title={"Confirm password"}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder={"Confirm your password"}
            type={"password"}
            errorText={passwordError}
            onBlur={onBlurPassword}
          />
        </div>
        <Button
          title={"set password"}
          onClick={onNewPasswordClick(oobCode, password)}
          type={ButtonType.Primary}
        />
      </div>
    </AuthContainer>
  );
};

export default NewPassword;
