const StyleButton = ({ onToggle, style, label, active }) => {
  // Handle toggle event
  const handleToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <button
      aria-labelledby={`${label} button`}
      type="button"
      onMouseDown={handleToggle}
      className={`cursor-pointer rounded border border-gray-300 px-3 py-1 ${
        active ? "bg-blue-500 text-white" : "bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

export default StyleButton;
