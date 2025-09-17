export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 rounded-xl skeleton ${className}`} />
  );
}