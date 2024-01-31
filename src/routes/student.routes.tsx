import StudentDashboard from "../pages/students/StudentDashboard";
import OfferedCourse from "../pages/students/OfferedCourse";

export const StudentPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },

  {
    name: "Offered Courses",
    path: "offered-courses",
    element: <OfferedCourse />,
  },
];
