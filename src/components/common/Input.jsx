import React from "react";
import clsx from "clsx";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  className = "",
}) => {
  return (
    <div className="relative">
      <div className="flex items-center">
        {icon && <div className="absolute left-3 z-10">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2",
            icon && "pl-12",
            error
              ? "border-red-500 text-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            className
          )}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
