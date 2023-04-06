import React, { FC, ReactNode } from "react";
import classNames from "classnames";

import { ButtonType } from "src/utils/@globalTypes";
import styles from "./Button.module.scss";

type ButtonProps = {
  title: string | ReactNode;
  onClick: () => void;
  type: ButtonType;
  disabled?: boolean;
  className?: string;
};

const buttonStyles = {
  [ButtonType.Primary]: styles.primaryButton,
  [ButtonType.White]: styles.whiteButton,
  [ButtonType.PrimaryIcon]: styles.PrimaryIconButton,
  [ButtonType.WhiteIcon]: styles.WhiteIconButton,
};

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  disabled,
  type,
  className,
}) => {
  const buttonClassName = buttonStyles[type];

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classNames(buttonClassName, className, {
        [styles.disabledPrimaryButton]: disabled && type === ButtonType.Primary,
        [styles.disabledPrimaryIconButton]: disabled && type === ButtonType.PrimaryIcon,
        [styles.disabledWhiteButton]: disabled && type === ButtonType.WhiteIcon,
      })}
    >
      {title}
    </div>
  );
};

export default Button;
