import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import Button from "src/components/Button/Button";
import Input from "src/components/Input/Input";
import Title from "src/components/Title/Title";
import { RoutesList } from "src/pages/Router";
import { ArrowIcon } from "src/assets/icons";
import { useAuth } from "src/hooks/useAuth";
import { removeUser } from "src/redux/reducers/userSlice";
import { clearCart } from "src/redux/reducers/cartSlice";
import { clearFavorites } from "src/redux/reducers/postSlice";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./Account.module.scss";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email } = useAuth();

  const [nameUser, setName] = useState("");
  const [emailUser, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeName = (value: string) => setName(value);
  const onChangeEmail = (value: string) => setEmail(value);
  const onChangePassword = (value: string) => setPassword(value);
  const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);

  const onArrowClick = () => navigate(-1);

  const onLogOutClick = () => {
    dispatch(removeUser());
    dispatch(clearCart());
    dispatch(clearFavorites());
    navigate(RoutesList.Main);
  };

  return (
    <div className={styles.containerAccount}>
      <div className={styles.arrow} onClick={onArrowClick}>
        <ArrowIcon />
      </div>
      <Title title="Account" />
      <div>
        <div className={styles.title}>Profile</div>
        <div className={styles.inputContainer}>
          {name && (
            <Input
              className={styles.input}
              value={nameUser}
              title="Name"
              onChange={onChangeName}
              placeholder={name}
              type="text"
            />
          )}
          {email && (
            <Input
              className={styles.input}
              value={emailUser}
              title="Email"
              onChange={onChangeEmail}
              placeholder={email}
              type="text"
            />
          )}
        </div>
      </div>
      <div className={styles.borderContainer}>
        <div className={styles.title}>Password</div>
        <Input
          className={styles.input}
          value={""}
          title="Password"
          onChange={onChangePassword}
          placeholder={"Password"}
          type="password"
        />
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            value={password}
            title="New password"
            onChange={onChangePassword}
            placeholder="New password"
            type="password"
          />
          <Input
            className={styles.input}
            value={confirmPassword}
            title="Confirm new password"
            onChange={onChangeConfirmPassword}
            placeholder="Confirm new password"
            type="password"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          title="Save changes"
          onClick={() => {}}
          type={ButtonType.Primary}
        />
        <Button
          className={classNames(styles.button, styles.whiteButton)}
          title="cancel"
          onClick={onArrowClick}
          type={ButtonType.White}
        />
        <Button
          className={styles.button}
          title="Log Out"
          onClick={onLogOutClick}
          type={ButtonType.Primary}
        />
      </div>
    </div>
  );
};

export default Account;
