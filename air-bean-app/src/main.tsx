import { createRoot } from "react-dom/client";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Status from "./pages/Status";
import History from "./pages/History";
import Order from "./pages/Order";
import Profile from "./pages/Profile";

import "./main.scss";

const router = createHashRouter([
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
    path: "/order",
    element: <Order />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/history",
    element: <History />,
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
