/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button, Row } from "antd";
import PHForm from "../components/form/PhForm";
import PHInput from "../components/form/PHInput";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/VerifyToken";

const Login = () => {
  const defaultValues = {
    username: "dev_asif",
    password: "123456",
  };

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    // console.log(data, toastId);
    try {
      const userInfo = {
        username: data.username.trim(),
        password: data.password.trim(),
      };
      console.log(userInfo);

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token as string) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken as string }));

      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
      // navigate(`/user/dashboard`);
    } catch (error) {
      console.log("err: ", error);
      if (error?.data?.stack === "password") {
        toast.error(error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("username do not match", { id: toastId, duration: 2000 });
      }
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="username" label="UserName:" />
          <PHInput type="text" name="password" label="Password" />
          <Button htmlType="submit">Login</Button>
        </PHForm>
      </Row>
    </div>
  );
};

export default Login;
