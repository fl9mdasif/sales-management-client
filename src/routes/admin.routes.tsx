import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/Create Users/CreateAdmin";
import CreateStudent from "../pages/admin/Create Users/CreateStudent";
import AcademicSemester from "../pages/admin/AcademicManagement/academicSemester.Api";

export const AdminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },

      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];
