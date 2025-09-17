export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-telkomsel-red to-telkomsel-dark text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-white/10 grid place-items-center font-bold">FA</div>
          <h1 className="text-lg font-semibold">PhotoKu — Biometric Photo Marketplace</h1>
        </div>
      </div>
    </header>
  );
}