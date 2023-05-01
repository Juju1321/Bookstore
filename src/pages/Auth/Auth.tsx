import React, { useState } from "react";

import SignIn from "src/components/SignIn/SignIn";
import AuthContainer from "src/pages/AuthContainer";
import styles from "./Auth.module.scss";
import Button from "src/components/Button";
import classNames from "classnames";
import { ButtonType } from "src/utils/@globalTypes";
import SignUp from "src/components/SignUp";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [activeSignInButton, setActiveSignInButton] = useState(true);
  const [activeSignUpButton, setActiveSignUpButton] = useState(false);
  const isDisabled = true;
  const onClickSignInButton = () => {
    setActiveSignInButton(!activeSignInButton);
    setActiveSignUpButton(false);
  };
  const onClickSignUpButton = () => {
    setActiveSignUpButton(!activeSignUpButton);
    setActiveSignInButton(false);
  };

  return (
    <AuthContainer className={styles.mainBlockContainer}>
      <div className={styles.buttonContainer}>
        {activeSignInButton ? (
          <Button
            title={"sign in"}
            onClick={onClickSignInButton}
            disabled={isDisabled}
            type={ButtonType.White}
            className={classNames(styles.button, {
              [styles.activeButton]: activeSignInButton,
            })}
          />
        ) : (
          <Button
            title={"sign in"}
            onClick={onClickSignInButton}
            type={ButtonType.White}
            className={styles.button}
          />
        )}

        {activeSignUpButton ? (
          <Button
            title={"sign up"}
            onClick={onClickSignUpButton}
            disabled={isDisabled}
            type={ButtonType.White}
            className={classNames(styles.button, {
              [styles.activeButton]: activeSignUpButton,
            })}
          />
        ) : (
          <Button
            title={"sign up"}
            onClick={onClickSignUpButton}
            type={ButtonType.White}
            className={styles.button}
          />
        )}
      </div>
      {activeSignInButton && <SignIn />}
      {activeSignUpButton && <SignUp />}
    </AuthContainer>
  );
};

export default Auth;
