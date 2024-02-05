import { Button, Form, Input, InputNumber, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useCreateOrderMutation } from "../../../redux/features/sales/salesApi";
import { toast } from "sonner";
import { TOrder } from "../../../types/sales.types";
import { TProduct } from "../../../types/product.types";
import { useUpdateProductMutation } from "../../../redux/features/Product/productApi";

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
  const initialOrderData = {
    productId: "products?.productId",
    buyer: "",
    quantity: 0,
    dateOfSales: "products.dateOfSale",
  };
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [createOrder] = useCreateOrderMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [orderData, setOrderData] = useState<TOrder>(initialOrderData);

  const handleOrderModalOk = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOrderModalCancel = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };

  const handleUpdateModalOk = () => {
    setIsUpdateModalOpen(false);
    setSelectedProductId(null);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
    setSelectedProductId(null);
  };

  const openOrderModal = (id: string) => {
    setIsOrderModalOpen(true);
    setSelectedProductId(id);
  };

  // update modal button
  const openUpdateModal = (id: string) => {
    setIsUpdateModalOpen(true);
    setSelectedProductId(id);
    console.log(id);
  };

  // place order with modal
  const updateProductWithFormValues = async (updatedFieldData: TOrder) => {
    console.log(updatedFieldData);
    try {
      const toastId = toast.loading("Loading...");
      console.log(selectedProductId);
      // Use the createShoes mutation to handle the API call
      const res = await updateProduct({
        shoeId: selectedProductId,
        updatedData: updatedFieldData, // Correct property name
      });
      console.log("res", res);

      if (!res.data) {
        toast.error(`Decrease quantity for order `, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Update product successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };

  const onFinish = async (orderData: TOrder) => {
    const toastId = toast.loading("Loading...");
    try {
      // Use the createShoes mutation to handle the API call
      const res = await createOrder(orderData).unwrap();
      // console.log("res", res.data);
      if (!res.data) {
        toast.error(`Decrease quantity for order `, {
          id: toastId,
          duration: 2000,
        });
      } else {
        setOrderData(initialOrderData);
        toast.success("Order Created  successfully", {
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
              onClick={() => openOrderModal(product._id)}
              className="bg-green-600"
              type="primary"
            >
              Order
            </Button>

            {/* update modal */}
            <Modal
              title="Update Modal"
              open={selectedProductId === product._id}
              onOk={handleUpdateModalOk}
              onCancel={handleUpdateModalCancel}
            >
              <div className="mt-4 h-[100vh]  ">
                <Form
                  {...formItemLayout}
                  variant="filled"
                  onFinish={updateProductWithFormValues}
                  style={{ maxWidth: 600 }}
                >
                  <div className="flex gap-10 ">
                    <div className="div1">
                      {/* Product name */}
                      <Form.Item
                        label="Product name"
                        name="productName"
                        initialValue={product.productName}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* Product model */}
                      <Form.Item
                        label="Model"
                        name="model"
                        initialValue={product.model}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* brand  */}
                      <Form.Item
                        label="Brand"
                        name="brand"
                        initialValue={product.brand}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* quantity  */}
                      <Form.Item
                        label="Quantity"
                        name="quantity"
                        initialValue={product.quantity}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      {/* price */}
                      <Form.Item
                        label="Price"
                        name="price"
                        initialValue={product.price}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      {/* size */}
                      <Form.Item
                        label="Size"
                        name="size"
                        initialValue={product.size}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* color */}
                      <Form.Item
                        label="Color"
                        name="color"
                        initialValue={product.color}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    {/* div 2 */}
                    <div className="div2">
                      {/* gender  */}
                      <Form.Item
                        label="Gender"
                        name="gender"
                        initialValue={product.gender}
                      >
                        <Select>
                          <Select.Option value="male">Male</Select.Option>
                          <Select.Option value="female">Female</Select.Option>
                        </Select>
                      </Form.Item>
                      {/* category  */}
                      <Form.Item
                        label="category"
                        name="category"
                        initialValue={product.category}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="rawMaterial"
                        name="rawMaterial"
                        initialValue={product.rawMaterial}
                      >
                        <Select>
                          <Select.Option value="leather">leather</Select.Option>
                          <Select.Option value="fabric">fabric</Select.Option>
                          <Select.Option value="jeans">jeans</Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Cover URL"
                        name="coverPhoto"
                        initialValue={product.coverPhoto}
                        rules={[{ message: "Please input!" }]}
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
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </div>
            </Modal>

            <Button
              className="bg-red-500 text-white font-bold"
              onClick={() => openUpdateModal(product._id)}
            >
              Edit
            </Button>
            {/* order modal  */}
            <Modal
              title="Order Modal"
              open={isOrderModalOpen && selectedProductId === product._id}
              onOk={handleOrderModalOk}
              onCancel={handleOrderModalCancel}
            >
              <div>
                {/* order form */}
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
                      className="bg-green-600  text-white font-bold"
                      htmlType="submit"
                    >
                      Create order
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SingleProduct;
