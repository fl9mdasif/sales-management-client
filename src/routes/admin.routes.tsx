import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/Create Users/CreateStudent";
import CreateProduct from "../pages/admin/ProductManagement/CreateProduct.Api";
import Products from "../pages/admin/ProductManagement/Products";

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
        element: <CreateStudent />,
      },
    ],
  },
];
