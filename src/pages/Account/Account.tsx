import React from "react";
import Button from "src/components/Button/Button";
import Input from "src/components/Input/Input";
import Title from "src/components/Title/Title";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./Account.module.scss";
import classNames from "classnames";
import { ArrowIcon } from "src/assets/icons";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const onArrowClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={styles.arrow} onClick={onArrowClick}>
        <ArrowIcon />
      </div>
      <Title title="Account" />
      <div>
        <div className={styles.title}>Profile</div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            value={""}
            title="Name"
            onChange={() => {}}
            placeholder={""}
            type="text"
          />
          <Input
            className={styles.input}
            value={""}
            title="Email"
            onChange={() => {}}
            placeholder={""}
            type="text"
          />
        </div>
      </div>
      <div className={styles.borderContainer}>
        <div className={styles.title}>Password</div>
        <Input
          className={styles.input}
          value={""}
          title="Password"
          onChange={() => {}}
          placeholder={""}
          type="password"
        />
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            value={""}
            title="New password"
            onChange={() => {}}
            placeholder="New password"
            type="password"
          />
          <Input
            className={styles.input}
            value={""}
            title="Confirm new password"
            onChange={() => {}}
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
          onClick={() => {}}
          type={ButtonType.White}
        />
      </div>
    </div>
  );
};

export default Account;
