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
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${isLoading ? 'animate-pulse' : ''}`}
    >
      {children}
    </button>
  );
}
