import { Layout, Menu } from "antd";
import { AdminPath } from "../../routes/admin.routes";
import { StudentPath } from "../../routes/student.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
// import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
// import { FacultyPath } from "../../routes/faculty.routes";
// import { useAppSelector } from "../../redux/hooks";
// import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  STUDENT: "student",
};

const Sidebar = () => {
  // const user = useAppSelector(selectCurrentUser);
  const user = { role: "admin" };

  let sidebarItems;

  switch (user!.role) {
    case "admin":
      sidebarItems = sidebarItemsGenerator(AdminPath, userRole.ADMIN);
      break;

    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(StudentPath, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
