/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Checkbox, Form, Input, Select } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const { confirm, ...formDataWithoutConfirm } = values;

    console.log(formDataWithoutConfirm);
    console.log("Received values of form: ", formDataWithoutConfirm);
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="88">+88</Option>
  //       {/* <Option value="87">+</Option> */}
  //     </Select>
  //   </Form.Item>
  // );

  // validate phone number
  const validatePhoneNumber = (_: any, value: string) => {
    const phoneNumberRegex = /^\d{11}$/; // 11 digits
    return phoneNumberRegex.test(value)
      ? Promise.resolve()
      : Promise.reject(
          new Error("Please input a valid 11-digit phone number!")
        );
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div>
        <div>
          <h1 className="className">Wel</h1>
        </div>
        <div className="h-72">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            style={{ padding: 30, maxWidth: 670 }}
            scrollToFirstError
          >
            {/* username  */}
            <Form.Item
              name="username"
              label="Username"
              tooltip="yourname, avoid white spaces"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                  whitespace: false,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/*  email */}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* pass */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Pass"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* contact */}
            <Form.Item
              name="contactNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                { validator: validatePhoneNumber },
              ]}
            >
              <Input addonBefore="+88" style={{ width: "100%" }} />
            </Form.Item>

            {/* role */}
            <Form.Item
              name="role"
              label="Role"
              initialValue="user" // Set default value here
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Input readOnly />
            </Form.Item>

            {/* Checkbox */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>

            {/* button */}
            <Form.Item {...tailFormItemLayout}>
              <Button
                className="px-8  text-center font-bold  bg-red-600"
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
