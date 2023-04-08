import React, { FC, useState } from "react";

import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./Subscribe.module.scss";

type SubscribeProps = {
  title: string;
  description: string;
};

const Subscribe: FC<SubscribeProps> = ({ title, description }) => {
  const [email, setEmail] = useState("");
  const onChange = (value: string) => setEmail(value);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.inputButtonContainer}>
        <Input
          value={email}
          onChange={onChange}
          placeholder={"Your email"}
          type={"text"}
          className={styles.input}
        />
        <Button
          className={styles.button}
          title={"Subscribe"}
          onClick={() => {}}
          type={ButtonType.Primary}
        />
      </div>
    </div>
  );
};

export default Subscribe;
