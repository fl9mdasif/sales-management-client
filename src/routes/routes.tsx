// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import Login from "../pages/Login";
// import { routerGenerator } from "../utils/routerGenerator";
// import { AdminPath } from "./admin.routes";
// import Registration from "../pages/Registration";
// import { BuyerPath } from "./buyer.routes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/seller",
//     element: <App />,
//     children: routerGenerator(AdminPath),
//   },
//   {
//     path: "/buyer",
//     element: <App />,
//     children: routerGenerator(BuyerPath),
//   },
//   {
//     path: "/superAdmin",
//     element: <App />,
//     children: routerGenerator(AdminPath),
//   },

//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/registration",
//     element: <Registration />,
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { routerGenerator } from "../utils/routerGenerator";
import { AdminPath } from "./admin.routes";
import Registration from "../pages/Registration";
import { BuyerPath } from "./buyer.routes";

const router = createBrowserRouter([
  {
    path: "/seller",
    element: <App />,
    children: routerGenerator(AdminPath),
  },
  {
    path: "/buyer",
    element: <App />,
    children: routerGenerator(BuyerPath),
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
