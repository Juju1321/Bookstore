import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

type InputProps = {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: string;
  errorText?: string;
  disabled?: boolean;
  className?: string,
};

const Input: FC<InputProps> = ({
  title,
  value,
  onChange,
  placeholder,
  errorText,
  disabled,
  type,
    className
}) => {
  const onChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      <input
        placeholder={placeholder}
        onChange={onChangeInputText}
        value={value}
        type={type}
        disabled={disabled}
        className={classNames(styles.input, className, {
          [styles.disabledInput]: disabled,
          [styles.errorInput]: errorText,
        })}
      />
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default Input;
