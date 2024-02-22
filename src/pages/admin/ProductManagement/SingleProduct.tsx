/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input, InputNumber, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useCreateOrderMutation } from "../../../redux/features/sales/salesApi";
import { toast } from "sonner";
import { TProduct } from "../../../types/product.types";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../redux/features/Product/productApi";

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

const SingleProduct = ({ products, onChange, selectedShoes, refetch }: any) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [, setIsUpdateModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [createOrder] = useCreateOrderMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [createShoes] = useCreateProductMutation();

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

  // update product
  const updateProductWithFormValues = async (updatedFieldData: TProduct) => {
    // console.log(updatedFieldData);
    try {
      setIsUpdateModalOpen(false);
      const toastId = toast.loading("Loading...");
      console.log(selectedProductId);
      // Use the createShoes mutation to handle the API call
      const res: any = await updateProduct({
        shoeId: selectedProductId as string,
        updatedData: updatedFieldData, // Correct property name
      });
      // console.log("res", res);

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
        refetch();
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };

  // duplicate product
  const duplicateProduct = async (duplicateData: any) => {
    const { _id, updatedAt, _v, createdAt, ...duplicateProductWithOut_id } =
      duplicateData;
    // console.log(duplicateData);
    console.log(duplicateProductWithOut_id);
    try {
      const toastId = toast.loading("Loading...");

      // Use the createShoes mutation to handle the API call
      const res = await createShoes(duplicateProductWithOut_id);
      // console.log("res", res);

      if (res) {
        toast.success("Product duplicate successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };

  // place order with modal
  const onFinish = async (orderData: any) => {
    setIsOrderModalOpen(false);

    const toastId = toast.loading("Loading...");
    try {
      // Use the createShoes mutation to handle the API call
      const res: any = await createOrder(orderData).unwrap();

      // console.log("res", res.data);
      if (!res.data) {
        toast.error(`Decrease quantity for order `, {
          id: toastId,
          duration: 2000,
        });
      } else {
        // setOrderData(initialOrderData);

        toast.success("Order Created  successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
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
              onClick={() => {
                if (product._id) {
                  openOrderModal(product._id);
                }
              }}
              className="bg-green-600 font-bold text-white"
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
              className="bg-yellow-500 text-white font-bold"
              onClick={() => duplicateProduct(product)}
            >
              Duplicate
            </Button>
            <Button
              className="bg-red-500 text-white font-bold"
              onClick={() => {
                if (product._id) {
                  openUpdateModal(product._id);
                }
              }}
            >
              Update
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
