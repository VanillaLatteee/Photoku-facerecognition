import { Link, useLocation } from "react-router-dom";
import iconPopular from "../assets/icons/icon_Popular.svg";
import iconPhotoKu from "../assets/icons/icon_PhotoKu.svg";
import iconFavorit from "../assets/icons/icon_Favorit.svg";
import iconCart from "../assets/icons/icon_cart.svg";

const navs = [
  { path: "/home/event", label: "Event", icon: iconPopular },
  { path: "/home/photoku", label: "PhotoKu", icon: iconPhotoKu },
  { path: "/home/favorit", label: "Favorit", icon: iconFavorit },
  { path: "/home/cart", label: "Cart", icon: iconCart },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 h-16 border-t bg-white shadow-sm">
      <div className="mx-auto grid h-full max-w-md grid-cols-4">
        {navs.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.path}
              className={`mx-3 flex flex-col items-center justify-center py-2 text-xs ${active ? "border-t-2 border-[#0050AE]" : ""} `}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`mb-1 h-6 w-6 ${active ? "" : "opacity-40"}`}
                style={
                  active
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(20%) sepia(83%) saturate(3743%) hue-rotate(199deg) brightness(94%) contrast(100%)",
                      }
                    : {}
                }
              />
              <span
                className={
                  active ? "font-medium text-[#0050AE]" : "text-gray-400"
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
