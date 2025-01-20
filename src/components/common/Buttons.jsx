import React from "react";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`
        px-4 py-2 rounded-md transition-colors 
        ${variantClasses[variant]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
