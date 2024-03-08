import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Status from "./pages/Status";
import Login from "./components/Login/Login";
import Profile from "./pages/Profile";

import "./main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/cart",
    element: (
      <Cart
        handleToggleCart={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    path: "/status",
    element: <Status />,
  },
 
  {
    path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
