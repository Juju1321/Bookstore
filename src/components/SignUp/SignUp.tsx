import React, { useState, useEffect, useMemo } from "react";
import styles from "src/components/SignUp/SignUp.module.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "src/redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    if (name.length === 0 && nameTouched) {
      setNameError("Name is required field");
    } else {
      setNameError("");
    }
  }, [name, nameTouched]);

  useEffect(() => {
    if (email.length === 0 && emailTouched) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email, emailTouched]);

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
  const onChangeName = (value: string) => setName(value);
  const onChangeEmail = (value: string) => setEmail(value);
  const onChangePassword = (value: string) => setPassword(value);
  const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);

  const onBlurEmail = () => {
    setEmailTouched(true);
  };

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };

  const onBlurName = () => {
    setNameTouched(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (email: string, password: string) => () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            name,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate(RoutesList.Main);
      })
      .catch(console.error);
  };

  const isValid = useMemo(() => {
    return (
      passwordError.length === 0 &&
      nameTouched &&
      emailTouched &&
      passwordTouched
    );
  }, [passwordError, nameTouched, emailTouched, passwordTouched]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Input
          title={"Name"}
          value={name}
          onChange={onChangeName}
          placeholder={"Your name"}
          type={"text"}
          errorText={nameError}
          onBlur={onBlurName}
        />
        <Input
          title={"Email"}
          value={email}
          onChange={onChangeEmail}
          placeholder={"Your email"}
          type={"text"}
          errorText={emailError}
          onBlur={onBlurEmail}
        />
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
        title={"sign up"}
        onClick={handleSignUp(email, password)}
        type={ButtonType.Primary}
        className={styles.button}
        disabled={!isValid}
      />
    </div>
  );
};

export default SignUp;
