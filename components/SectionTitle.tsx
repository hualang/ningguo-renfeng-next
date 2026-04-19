export function SectionTitle({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`mb-4 text-[1.75rem] font-semibold tracking-tight text-ink ${className}`}
    >
      {children}
    </h2>
  );
}
