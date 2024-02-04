import { Button, Form, Input, InputNumber } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useCreateOrderMutation } from "../../../redux/features/sales/salesApi";
import { toast } from "sonner";
import { TOrder } from "../../../types/sales.types";
import { TProduct } from "../../../types/product.types";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const SingleProduct = ({ products, onChange, selectedShoes }) => {
  // console.log("sp", products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  // console.log("ll", [...selectedShoes]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onEditButtonClick = (id: string) => {
    console.log(id);
  };
  const onDeleteButtonClick = (id: string) => {
    console.log(id);
  };

  const onFinish = async (orderData: TOrder) => {
    const toastId = toast.loading("Loading...");
    try {
      // Use the createShoes mutation to handle the API call
      const res = await createOrder(orderData).unwrap();
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
  // create order
  const openModal = async () => {
    setIsModalOpen(true);
  };

  return (
    <tbody>
      {products?.data?.map((product: TProduct) => (
        <tr key={product._id}>
          <td>
            {/* checkbox */}

            <input
              type="checkbox"
              checked={selectedShoes.has(product._id)}
              onChange={(e) => onChange(product._id, e.target.checked)}
            />
          </td>

          <td>
            <img className="w-20  " src={product.coverPhoto} alt="product" />
          </td>
          <td>{product.productName}</td>
          <td>{product.brand}</td>
          <td>{product.model}</td>
          <td>{product.category}</td>
          <td>{product.color}</td>
          <td>{product.createdAt.slice(0, 10)}</td>
          <td>{product.gender}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.rawMaterial}</td>
          <td>{product.size}</td>
          <td className="flex flex-col">
            <Button
              onClick={() => openModal()}
              className="bg-green-600"
              type="primary"
            >
              Order
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div>
                <Form
                  {...formItemLayout}
                  variant="filled"
                  onFinish={onFinish}
                  style={{ maxWidth: 600 }}
                >
                  {/* product Id*/}
                  <Form.Item
                    label="Product Id"
                    name="productId"
                    initialValue={product._id}
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* buyer name */}
                  <Form.Item
                    label="Buyer Name "
                    name="buyer"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* buyer name */}
                  <Form.Item
                    label="Quantity "
                    name="quantity"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  {/* buyer name */}
                  <Form.Item
                    label="Date of Sales "
                    name="dateOfSales"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* button  */}
                  <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button
                      className="bg-green-600"
                      type="primary"
                      htmlType="submit"
                    >
                      Order Now
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>

            <button onClick={() => onEditButtonClick("/")}>Edit</button>
            <button onClick={() => onDeleteButtonClick("/")}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SingleProduct;
