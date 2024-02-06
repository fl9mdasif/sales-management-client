import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/ProductManagement/CreateProduct.Api";
import Products from "../pages/admin/ProductManagement/Products";
import SalesHistory from "../pages/admin/Sales-Management/SalesHistory";

export const AdminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Product management",
    children: [
      {
        name: "Create Product",
        path: "create-products",
        element: <CreateProduct />,
      },
      {
        name: "All Product",
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
];
