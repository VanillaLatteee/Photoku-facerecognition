import { Home, Camera, Images, ShoppingCart, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';

function Tab({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link to={to} className="flex flex-col items-center gap-1 px-3 py-2">
      <Icon className={active ? 'text-tsel.primary' : 'text-slate-500'} size={22} />
      <span className={`text-[11px] ${active ? 'text-tsel.primary' : 'text-slate-500'}`}>{label}</span>
    </Link>
  );
}

export function MobileShell({ children, title }: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <header className="pt-safe-top bg-tsel-gradient text-white">
        <div className="px-4 py-3">
          <div className="text-sm opacity-80">PhotoKu</div>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4">{children}</main>

      {/* Bottom Nav */}
      <nav className="pb-safe-bottom border-t bg-white grid grid-cols-5">
        <Tab to="/home"       icon={Home}   label="Home" />
        <Tab to="/scan"   icon={Camera} label="Scan" />
        <Tab to="/gallery" icon={Images} label="Gallery" />
        <Tab to="/purchase" icon={ShoppingCart} label="Cart" />
        <Tab to="/admin"  icon={Shield} label="Admin" />
      </nav>
    </div>
  );
}