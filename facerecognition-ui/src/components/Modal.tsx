import { ReactNode } from "react";

export default function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full sm:max-w-md sm:rounded-3xl sm:overflow-hidden sm:mx-3 
                      bg-white shadow-2xl animate-rise">
        {title && (
          <div className="px-4 py-3 border-b font-semibold">{title}</div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}