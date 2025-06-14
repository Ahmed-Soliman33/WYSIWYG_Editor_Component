const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_6_122)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.33333 1.33333H5.7778V5.7778H10.2222V10.2222H14.6667V14.6667H1.33333V1.33333Z"
            fill="#141414"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_122">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <h1 className="font-plus text-lg font-bold">React Editor Demo</h1>
    </div>
  );
};

export default Logo;
