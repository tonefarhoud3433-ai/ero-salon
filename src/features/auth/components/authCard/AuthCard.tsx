export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      w-full
      max-w-md
      bg-surface
      rounded-4xl
      shadow-xl
      p-8
    "
    >
      {children}
    </div>
  );
}
