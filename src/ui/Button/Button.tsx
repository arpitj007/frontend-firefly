import React, { forwardRef, isValidElement } from "react";
import classNames from "classnames";

import "./Button.scss";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  /**
   * An icon element.
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon relative to the label.
   */
  iconPosition?: "start" | "end";

  /**
   * Behavior of the button.
   */
  type?: "button" | "submit" | "reset";

  /**
   * Extra class
   */
  className?: string;
}

const Button = forwardRef(
  (
    {
      children,
      icon,
      type = "button",
      iconPosition = "start",
      className,
      ...restProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        {...restProps}
        type={type}
        className={classNames("button", className)}
        ref={ref}
      >
        {iconPosition === "start" && isValidElement(icon) && <>{icon}</>}
        {children}
        {iconPosition === "end" && isValidElement(icon) && <>{icon}</>}
      </button>
    );
  }
);

export default Button;
