import { forwardRef } from "react";
import "./Input.scss";
import classNames from "classnames";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Content, most commonly an icon, displayed at the left-hand side of the input field.
   */
  start?: React.ReactNode;
}

export const Input = forwardRef(
  (
    {
      className,
      "aria-invalid": invalid = false,
      start,
      ...otherProps
    }: TextFieldProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div
        className={classNames("input-wrapper", className)}
        {...(invalid && { "aria-invalid": true })}
      >
        {start}
        <input className="input" ref={ref} {...otherProps} />
      </div>
    );
  }
);

export default Input;
