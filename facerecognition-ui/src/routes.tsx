import { createBrowserRouter } from "react-router-dom";
import Landing from "./screens/Landing";
import Scan from "./screens/Scan";
import Gallery from "./screens/Gallery";
import Purchase from "./screens/Purchase";
import Admin from "./screens/Admin";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/scan", element: <Scan /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/purchase", element: <Purchase /> },
  { path: "/admin", element: <Admin /> },
]);
