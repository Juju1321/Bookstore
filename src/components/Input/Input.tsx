import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

type InputProps = {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  errorText?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void
};

const Input: FC<InputProps> = ({
  title,
  value,
  onChange,
  onKeyDown,
  placeholder,
  errorText,
  disabled,
  type,
  className,
  onBlur,
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
        onKeyDown={onKeyDown}
        value={value}
        type={type}
        disabled={disabled}
        onBlur={onBlur}
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
