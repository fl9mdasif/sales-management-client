/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useCreateProductMutation } from "../../../redux/features/Product/productApi";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/global";

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();

  const onFinish = async (shoesData: any) => {
    console.log(shoesData);
    const res: any = await createProduct(shoesData).unwrap();
    console.log(res);
    const toastId = toast.loading("Loading...");
    try {
      // Use the createShoes mutation to handle the API call

      // console.log("res", res);
      if (res) {
        toast.success("Product Created  successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };
  return (
    <div className=" h-[100vh]  ">
      <h1 className="text-2xl bold mb-4 text-center">Create Product</h1>

      <Form
        {...formItemLayout}
        variant="filled"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <div className="flex gap-10 ">
          <div className="div1">
            {/* Product name */}
            <Form.Item
              label="Product name"
              name="productName"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            {/* Product model */}
            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            {/* brand  */}
            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            {/* quantity  */}
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            {/* price */}
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            {/* size */}
            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
            {/* color */}
            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          {/* div 2 */}
          <div className="div2">
            {/* gender  */}
            <Form.Item label="Gender" name="gender">
              <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            {/* category  */}
            <Form.Item label="category" name="category">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="rawMaterial" name="rawMaterial">
              <Select>
                <Select.Option value="leather">leather</Select.Option>
                <Select.Option value="fabric">fabric</Select.Option>
                <Select.Option value="jeans">jeans</Select.Option>
              </Select>
            </Form.Item>

            {/* description */}
            <Form.Item
              label="Description"
              name="productDescription"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Cover URL"
              name="coverPhoto"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>

            {/* button  */}
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button className="bg-green-600" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default CreateProduct;
