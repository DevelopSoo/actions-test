'use client';

function Button({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="cursor-pointer rounded-md bg-blue-400 px-4 py-2 text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;
