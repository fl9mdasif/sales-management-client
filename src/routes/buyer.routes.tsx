import AdminDashboard from "../pages/admin/AdminDashboard";
import PolishService from "../pages/buyer/PolishService";
import PolishStatus from "../pages/buyer/PolishStatus";
import ProductData from "../pages/buyer/Products";

export const BuyerPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Product management",
    children: [
      {
        name: "All Product",
        path: "products",
        element: <ProductData />,
      },
    ],
  },
  {
    name: "Request Polish",
    children: [
      {
        name: "Make Polish ",
        path: "polish",
        element: <PolishService />,
      },
      {
        name: "Polish response  ",
        path: "polish-response",
        element: <PolishStatus />,
      },
    ],
  },
];
