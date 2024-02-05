import { Layout, Menu } from "antd";
import { AdminPath } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
import { useAppSelector } from "../../redux/hooks";
// import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  USER: "user",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch (user!.role) {
    case "user":
      sidebarItems = sidebarItemsGenerator(AdminPath, userRole.USER);
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
        <h1>Sales Dashboard</h1>
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
