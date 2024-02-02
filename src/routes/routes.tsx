import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { routerGenerator } from "../utils/routerGenerator";
import { AdminPath } from "./admin.routes";
import { StudentPath } from "./student.routes";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <App />,
    children: routerGenerator(AdminPath),
  },

  {
    path: "/student",
    element: <App />,
    children: routerGenerator(StudentPath),
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
