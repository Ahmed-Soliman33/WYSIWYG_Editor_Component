import { memo, useCallback } from "react";

const SwitchButton = ({
  checked,
  onChange,
  disabled = false,
  className = "",
  size = "lg",
}) => {
  const handleToggle = useCallback(() => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  }, [checked, disabled, onChange]);

  const sizes = {
    sm: "h-5 w-10 after:h-4 after:w-4 peer-checked:after:translate-x-4 sm:h-[1.3rem] sm:w-13 sm:after:h-4 sm:after:w-4 sm:peer-checked:after:translate-x-7",
    md: "h-7 w-12 after:h-5 after:w-5 peer-checked:after:translate-x-5 sm:h-9 sm:w-21 sm:after:h-7 sm:after:w-7 sm:peer-checked:after:translate-x-12",
    lg: "h-7 w-12 after:h-5 after:w-5 peer-checked:after:translate-x-5 sm:h-9 sm:w-21 sm:after:h-7 sm:after:w-7 sm:peer-checked:after:translate-x-12",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        <div
          className={`peer peer-checked:bg-primary peer-disabled:bg-grayColor bg-grayColor/50 rounded-full transition-colors duration-200 ease-in-out peer-disabled:cursor-not-allowed after:absolute after:top-1 after:left-1 after:rounded-full after:bg-white after:shadow-md after:transition-all after:duration-200 after:ease-in-out after:content-[''] ${sizes[size]}`}
        ></div>
      </label>
    </div>
  );
};

export default memo(SwitchButton);
