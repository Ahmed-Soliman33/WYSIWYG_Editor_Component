import PropTypes from "prop-types";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none  duration-300 ease-in-out cursor-pointer";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 ",
    secondary: "bg-tertiary text-primary hover:bg-secondary",
    outline: "text-primary bg-transparent hover:bg-primary hover:text-white",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-2 py-2 sm:px-[1.1rem] sm:py-2 text-[.9rem] sm:text-base ",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-labelledby={`${children} button`}
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

PropTypes.Button = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
