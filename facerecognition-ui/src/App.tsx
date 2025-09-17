import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";

// Screens
import Landing from "./screens/Landing";
import Gallery from "./screens/Gallery";
import Purchase from "./screens/Purchase";
import Admin from "./screens/Admin";
import Scan from "./screens/Scan";
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import Register from "./screens/Register";
import BiometricScan from "./screens/BiometricScan";
import BiometricScanAction from "./screens/BiometricScanAction";

import Profile from "./screens/profile/Profile";
import BiometricData from "./screens/profile/BiometricData";
import PurchaseHistory from "./screens/profile/PurchaseHistory";

import Photoku from "./screens/home/PhotoKu";
import Favorit from "./screens/home/Favorit";
import Cart from "./screens/home/cart/page";
import SuccessPage from "./screens/home/cart/SuccessPage";

import SearchHome from "./screens/search/SearchHome";
import SearchTyping from "./screens/search/SearchTyping";
import SearchResult from "./screens/search/SearchResult";
import SearchEmpty from "./screens/search/SearchEmpty";
import SearchError from "./screens/search/SearchError";
import SearchDetail from "./screens/search/SearchDetail";
import Events from "./screens/home/Events";

import NegotiationPage from "./screens/negotiation/Index";
import EventsMore from "./screens/home/events/EventsMore";
import EventsList from "./screens/home/events/EventsList";
import EventsDetails from "./screens/home/events/EventsDetails";
import FullImageView from "./screens/FullImageView";

function TitleSwitcher() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/profile/biometric"))
    return <TopBar title="Data Biometrik" />;
  if (pathname.startsWith("/profile/purchase-history"))
    return <TopBar title="Riwayat Pembelian" />;
  if (pathname === "/profile") return <TopBar title="Profil" />;
  if (pathname.startsWith("/search")) return null;
  if (pathname.startsWith("/search")) return null;

  switch (pathname) {
    case "/home":
    case "/home/favorit":
      return <TopBar title="Favorit" />;
    case "/home/cart":
      return <TopBar title="Cart" />;
    case "/gallery":
      return <TopBar title="Galeri" />;
    case "/purchase":
      return <TopBar title="Checkout" />;
    case "/admin":
      return <TopBar title="Admin" />;
    case "/scan":
      return <TopBar title="Scan" />;
    case "/home/event":
      return <TopBar title="Event" />;
    case "/home/photoku":
      return <TopBar title="PhotoKu" />;
    default:
      return null; // Splash & Onboarding
  }
}

export default function App() {
  const { pathname } = useLocation();

  const hideChrome =
    pathname === "/splash" ||
    pathname === "/onboarding" ||
    pathname === "/register" ||
    pathname === "/biometric-scan" ||
    pathname === "/biometric-scan-action" ||
    pathname.startsWith("/negotiation") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/search") ||
    pathname === "/home/event/more" ||
    pathname === "/home/event/list" ||
    pathname === "/home/event/detail" ||
    pathname === "/photo" ||
    pathname.startsWith("/success");

  return (
    <>
      {!hideChrome && <TitleSwitcher />}

      <main className={hideChrome ? "" : "screen safe-pt safe-pb"}>
        <div
          className={hideChrome ? "" : "mx-auto max-w-md space-y-4 p-2 pb-20"}
        >
          <Routes>
            {/* Splash Default */}
            <Route path="/" element={<Navigate to="/splash" replace />} />

            {/* Onboarding Flow */}
            <Route path="/splash" element={<Splash />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/biometric-scan" element={<BiometricScan />} />
            <Route
              path="/biometric-scan-action"
              element={<BiometricScanAction />}
            />

            {/* Home Tabs */}
            <Route path="/home" element={<Events />} />
            <Route path="/home/photoku" element={<Photoku />} />
            <Route path="/home/favorit" element={<Favorit />} />
            <Route path="/home/cart" element={<Cart />} />
            <Route path="/success/:id" element={<SuccessPage id={""} />} />
            {/* Main Pages */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/scan" element={<Scan />} />

            {/* Event Pages */}
            <Route path="/home/event" element={<Events />} />
            <Route path="/home/event/more" element={<EventsMore />} />
            <Route path="/home/event/list" element={<EventsList />} />
            <Route path="/home/event/detail" element={<EventsDetails />} />

            {/* Profile Pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/biometric" element={<BiometricData />} />
            <Route
              path="/profile/purchase-history"
              element={<PurchaseHistory />}
            />

            {/* Search Flow */}
            <Route path="/search" element={<SearchHome />} />
            <Route path="/search/typing" element={<SearchTyping />} />
            <Route path="/search/result" element={<SearchResult />} />
            <Route path="/search/empty" element={<SearchEmpty />} />
            <Route path="/search/error" element={<SearchError />} />
            <Route path="/search/detail/:item" element={<SearchDetail />} />

            {/* Negotiation Flow */}
            <Route path="/negotiation/:id" element={<NegotiationPage />} />

            {/* Full Image View */}
            <Route path="/photo" element={<FullImageView />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/splash" replace />} />
          </Routes>
        </div>
      </main>

      {!hideChrome && <BottomNav />}
    </>
  );
}
