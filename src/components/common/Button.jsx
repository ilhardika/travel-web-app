import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
}) => {
  const baseClasses =
    "py-3 rounded-lg text-white transition-all duration-300 focus:outline-none focus:ring-2";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-300",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
