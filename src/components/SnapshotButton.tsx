export default function SnapshotButton({
  children,
  disabled,
  isLoading,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  return (
    <button
      className={`bg-blue-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${isLoading ? "animate-pulse" : ""}`}
    >
      {children}
    </button>
  );
}
