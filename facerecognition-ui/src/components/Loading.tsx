export default function Loading({ label='Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-500">
      <span className="animate-spin inline-block size-5 border-2 border-gray-300 border-t-transparent rounded-full" />
      <span>{label}</span>
    </div>
  );
}