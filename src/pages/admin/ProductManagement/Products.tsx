// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMemo, useState } from "react";
// import {
//   useDeleteProductsMutation,
//   useGetAllProductsQuery,
// } from "../../../redux/features/Product/productApi";
// import SingleProduct from "./SingleProduct";
// import "./styles.products.css";
// import { SearchInputs, filteredData } from "../../../types/item.types";
// import { toast } from "sonner";

// const Products = () => {
//   const [selectedShoes, setSelectedShoes] = useState<Set<string>>(new Set());
//   const [deleteProducts] = useDeleteProductsMutation();

//   // deleteMultipleProducts
//   const deleteMultipleProducts = async () => {
//     // console.log("ll", [...selectedShoes]);

//     const productsIds = [...selectedShoes] as string[];
//     const result: any = await deleteProducts(productsIds);

//     setSelectedShoes(new Set());
//     refetch();
//     const toastId = toast.loading("Loading...");

//     if (result.data.statusCode === 200) {
//       toast.success("Product deleted Successfully", {
//         id: toastId,
//         duration: 2000,
//       });
//     }
//   };

//   // State to store search input for each column

//   const [searchInputs, setSearchInputs] = useState<SearchInputs>({
//     sortBy: "startDate",
//     sortOrder: "asc",
//     minPrice: 0,
//     maxPrice: 1000,
//     releasedAt: "",
//     brand: "",
//     model: "",
//     category: "",
//     color: "",
//     gender: "",
//     rawMaterial: "",
//     size: "",
//     productName: "",
//   });

//   // api

//   const { data, refetch }: any = useGetAllProductsQuery([
//     { name: "limit", value: 10 },
//     { name: "page", value: 1 },
//     { name: "sort", value: "id" },
//     // ...params,
//   ]);

//   const handleSearchInputChange = (
//     field: string,
//     value: string | number | undefined
//   ) => {
//     setSearchInputs((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // set product as filter requirements
//   useMemo(() => filteredData(data, searchInputs), [data, searchInputs]);
//   // console.log("searchInputs", searchInputs);
//   // console.log("filter", data);

//   // Extract unique brands from data
//   const uniqueBrands = useMemo(() => {
//     return [...new Set(data?.data?.map((item: any) => item.brand))];
//   }, [data]);
//   // Extract unique color  from data
//   const uniqueColors = useMemo(() => {
//     return [...new Set(data?.data?.map((item: any) => item.color))];
//   }, [data]);
//   // Extract unique size  from data
//   const uniqueSize = useMemo(() => {
//     return [...new Set(data?.data?.map((item: any) => item.size))];
//   }, [data]);
//   // Extract unique gender  from data
//   const uniqueGender = useMemo(() => {
//     return [...new Set(data?.data?.map((item: any) => item.gender))];
//   }, [data]);

//   return (
//     <div className="h-100">
//       <h1 className="font-bold text-green-700 text-2xl mb-2">
//         Product Dashboard
//       </h1>
//       <div>
//         <p className="text-xl text-yellow-700 mb-5">
//           Total {data?.meta?.total} products in inventory
//         </p>
//       </div>
//       <div className="filter-container flex gap-3 flex-wrap mb-4">
//         {/* Add filter components here */}
//         {/* sort by Price */}
//         <div className="filter-item ">
//           <div className="flex flex-col">
//             <label> Name:</label>
//             <input
//               type="text"
//               placeholder="Search by"
//               value={searchInputs.productName}
//               onChange={(e) =>
//                 handleSearchInputChange("productName", e.target.value)
//               }
//             />
//           </div>
//         </div>
//         {/* //color */}
//         <div className="filter-item color">
//           <label>color :</label>
//           <select
//             value={searchInputs.color}
//             onChange={(e) => handleSearchInputChange("color", e.target.value)}
//           >
//             <option value="">All Colors</option>
//             {uniqueColors?.map((item: any) => (
//               <option key={item} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* brand */}
//         <div className="filter-item brand">
//           <label>Brand:</label>
//           <select
//             value={searchInputs.brand}
//             onChange={(e) => handleSearchInputChange("brand", e.target.value)}
//           >
//             <option value="">All Brands</option>
//             {uniqueBrands?.map((brand: any) => (
//               <option key={brand} value={brand}>
//                 {brand}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* gender */}
//         <div className="filter-item ">
//           <label>Gender:</label>
//           <select
//             value={searchInputs.gender}
//             onChange={(e) => handleSearchInputChange("gender", e.target.value)}
//           >
//             <option value="">All</option>
//             {uniqueGender?.map((gender: any) => (
//               <option key={gender} value={gender}>
//                 {gender}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* size */}
//         <div className="filter-item ">
//           <label>Size:</label>
//           <select
//             value={searchInputs.size}
//             onChange={(e) => handleSearchInputChange("size", e.target.value)}
//           >
//             <option value="">All size</option>
//             {uniqueSize?.map((size: any) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* sort by Price */}
//         <div className="flex gap-3 ">
//           <div className="flex flex-col gap-2">
//             <label>Min Price:</label>
//             <input
//               type="text"
//               placeholder="min"
//               value={searchInputs.minPrice}
//               onChange={(e) =>
//                 handleSearchInputChange("minPrice", e.target.value)
//               }
//             />
//           </div>

//           {/* max price */}
//           <div className="flex flex-col gap-2">
//             <label>Max Price:</label>
//             <input
//               type="text"
//               placeholder="Search by"
//               value={searchInputs.maxPrice}
//               onChange={(e) =>
//                 handleSearchInputChange("maxPrice", e.target.value)
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <div className="scrollable-container">
//         <table className="scrollable-container">
//           <thead>
//             <tr className="">
//               <th>
//                 <button
//                   onClick={() => deleteMultipleProducts()}
//                   className="bg-red- text-red-500 px- py-1 rounded-md "
//                 >
//                   Delete
//                 </button>{" "}
//               </th>
//               <th>Cover </th>
//               <th>
//                 {/* Search inputs for each column */}
//                 Name
//               </th>
//               <th>Brand</th>
//               <th>Model</th>
//               <th>Category</th>
//               <th>Color</th>
//               <th>Created </th>
//               <th>Gender</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th> Material</th>
//               <th>Size</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <SingleProduct
//             products={data}
//             onChange={(id: string, checked: boolean) => {
//               const newSelectedShoes = new Set(selectedShoes);
//               if (checked) {
//                 newSelectedShoes.add(id);
//               } else {
//                 newSelectedShoes.delete(id);
//               }
//               setSelectedShoes(newSelectedShoes);
//             }}
//             selectedShoes={selectedShoes}
//             refetch={refetch}
//           ></SingleProduct>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  InputNumber,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";

import { toast } from "sonner";

import Modal from "antd/es/modal/Modal";
import { useCreateOrderMutation } from "../../../redux/features/sales/salesApi";
import { TQueryParam } from "../../../types/global";
import {
  useCreateProductMutation,
  useDeleteProductsMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../../redux/features/Product/productApi";
import { TProduct } from "../../../types/product.types";

export type TTableData = Partial<TProduct>;

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

const ProductData = () => {
  const [createShoes] = useCreateProductMutation();

  const [createOrder] = useCreateOrderMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProducts] = useDeleteProductsMutation();

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: productData,
    isFetching,
    refetch,
  } = useGetAllProductsQuery(params);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [productId, setProductId] = useState<string | null>(null);

  // const [selectedProductIds, setSelectedProductIds] = useState([]);

  const [selectedShoes, setSelectedShoes] = useState<Set<string>>(new Set());

  const openOrderModal = (id: string) => {
    setIsOrderModalOpen(true);
    setSelectedProductId(id);
    // console.log(id);
  };

  const handleOrderModalOk = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOrderModalCancel = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };
  // update modal button
  const openUpdateModal = (id: string) => {
    setIsUpdateModalOpen(true);
    setSelectedProductId(id);
  };
  const handleUpdateModalOk = () => {
    setIsUpdateModalOpen(false);
    setSelectedProductId(null);
  };
  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
    setSelectedProductId(null);
  };

  // update product
  const updateProducts = async (updatedFieldData: TProduct) => {
    // console.log(productId);
    try {
      setIsUpdateModalOpen(false);
      const toastId = toast.loading("Loading...");
      // console.log(selectedProductId);
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

  // place order with modal
  const onFinish = async (orderData: any) => {
    const toastId = toast.loading("Loading...");
    try {
      // Use the createShoes mutation to handle the API call
      const res: any = await createOrder(orderData).unwrap();

      //   console.log("res", res.data);
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

  // deleteMultipleProducts
  const deleteMultipleProducts = async () => {
    console.log("ll", [...selectedShoes]);

    const productsIds = [...selectedShoes] as string[];
    const result: any = await deleteProducts(productsIds);

    setSelectedShoes(new Set());
    refetch();
    const toastId = toast.loading("Loading...");

    if (result.data.statusCode === 200) {
      toast.success("Product deleted Successfully", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  //   console.log("params", params);

  const onSearch = (value: string) => {
    setSearchTerm(value);
    setParams([
      { name: "productName", value },
      // Add other filters as needed
    ]);
  };

  const onChangeCheckbox = (productId: any, isChecked: boolean) => {
    console.log(selectedShoes);

    const newSelectedShoes = new Set(selectedShoes);
    if (isChecked) {
      newSelectedShoes.add(productId);
    } else {
      newSelectedShoes.delete(productId);
    }
    setSelectedShoes(newSelectedShoes);
  };

  const metaData = productData?.meta as any;
  // console.log("m", metaData);

  const tableData: any = productData?.data?.map(
    ({
      _id,
      productName,
      id,
      price,
      brand,
      gender,
      color,
      rawMaterial,
      category,
      size,
      coverPhoto,
      quantity,
      model,
    }: any) => ({
      key: _id,
      productName,
      id,
      price,
      brand,
      gender,
      color,
      rawMaterial,
      category,
      size,
      coverPhoto,
      quantity,
      model,
    })
  );
  //   console.log("cover", tableData);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Delete",
      key: "delete",
      render: (item) => (
        <input
          type="checkbox"
          checked={false}
          onChange={(e) => onChangeCheckbox(item.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Cover",
      key: "coverPhoto",
      render: (item) => (
        <img src={item.coverPhoto} alt="Cover" style={{ width: "60px" }} />
      ),
    },
    {
      title: "Name",
      key: "productName",
      dataIndex: "productName",
    },

    {
      title: "Product Unique Id",
      key: "key",

      render: (item) => <p className="w-20">{item.key}</p>,
    },
    {
      title: "Price.",
      key: "price",
      dataIndex: "price",
    },

    // brand
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
      filters: [
        {
          text: "Nike",
          value: "Nike",
        },
        {
          text: "Apex",
          value: "Apex",
        },
        {
          text: "Lotto",
          value: "Lotto",
        },
      ],
    },
    // gender
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
    },
    // gender
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
      filters: [
        {
          text: "28",
          value: "28",
        },
        {
          text: "30",
          value: "30",
        },
        {
          text: "32",
          value: "32",
        },
        {
          text: "34",
          value: "34",
        },
      ],
    },
    //color
    {
      title: "Color.",
      key: "color",
      dataIndex: "color",
      filters: [
        {
          text: "White",
          value: "white",
        },
        {
          text: "Red",
          value: "red",
        },
        {
          text: "Black",
          value: "black",
        },
        {
          text: "Brown",
          value: "brown",
        },
      ],
    },
    // raw materials
    {
      title: "Material",
      key: "rawMaterial",
      dataIndex: "rawMaterial",
      filters: [
        {
          text: "leather",
          value: "leather",
        },
        {
          text: "fabric",
          value: "fabric",
        },
        {
          text: "jeans",
          value: "jeans",
        },
      ],
    },
    // category
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      filters: [
        {
          text: "Sneakers",
          value: "sneakers",
        },
        {
          text: "converse",
          value: "converse",
        },
        {
          text: "loffer",
          value: "loffer",
        },
      ],
    },

    {
      title: "Action1",
      key: "order",
      render: (item) => {
        return (
          <Space>
            <Button
              onClick={() => {
                if (item.key) {
                  openOrderModal(item.key);
                }
              }}
              className="bg-green-600 font-bold text-white"
            >
              Order
            </Button>
            {/* </Link> */}
            {/* order modal  */}
            <Modal
              title="Order Modal"
              open={isOrderModalOpen}
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
                    initialValue={selectedProductId}
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
          </Space>
        );
      },
      width: "1%",
    },
    // update
    {
      title: "Action2",
      key: "update",
      render: (item) => {
        // console.log("o", item);
        return (
          <Space>
            {/* <Link to={`/seller/${item.key}`}> */}
            <Button
              onClick={() => {
                if (item.key) {
                  openUpdateModal(item.key);
                  setProductId(item.key);
                }
              }}
              className="bg-yellow-600 font-bold text-white"
            >
              Update
            </Button>
            {/* </Link> */}
            {/* order modal  */}
            <Modal
              title="Update Modal"
              open={isUpdateModalOpen}
              onOk={handleUpdateModalOk}
              onCancel={handleUpdateModalCancel}
            >
              <div className="mt-4 h-[100vh]  ">
                <p>update info of {productId}</p>

                <Form
                  {...formItemLayout}
                  variant="filled"
                  onFinish={updateProducts}
                  style={{ maxWidth: 600 }}
                >
                  <div className="flex gap-10 ">
                    <div className="div1">
                      {/* Product name */}
                      <Form.Item
                        label="Product name"
                        name="productName"
                        initialValue={item.productName}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* Product model */}
                      <Form.Item
                        label="Model"
                        name="model"
                        initialValue={item.model}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* brand  */}
                      <Form.Item
                        label="Brand"
                        name="brand"
                        initialValue={item.brand}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* quantity  */}
                      <Form.Item
                        label="Quantity"
                        name="quantity"
                        initialValue={item.quantity}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      {/* price */}
                      <Form.Item
                        label="Price"
                        name="price"
                        initialValue={item.price}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      {/* size */}
                      <Form.Item
                        label="Size"
                        name="size"
                        initialValue={item.size}
                        rules={[{ message: "Please input!" }]}
                      >
                        <Input />
                      </Form.Item>
                      {/* color */}
                      <Form.Item
                        label="Color"
                        name="color"
                        initialValue={item.color}
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
                        initialValue={item.gender}
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
                        initialValue={item.category}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="rawMaterial"
                        name="rawMaterial"
                        initialValue={item.rawMaterial}
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
                        // initialValue={item.coverPhoto}
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
          </Space>
        );
      },
      width: "1%",
    },
    // duplicate
    {
      title: "Action3",
      key: "duplicate items",
      render: (item) => {
        return (
          <Button
            onClick={() => {
              if (item.key) {
                duplicateProduct(item);
              }
            }}
            className="bg-blue-600 font-bold text-white"
          >
            Duplicate
          </Button>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.brand?.forEach((item) =>
        queryParams.push({ name: "brand", value: item })
      );
      filters.gender?.forEach((item) =>
        queryParams.push({ name: "gender", value: item })
      );
      filters.rawMaterial?.forEach((item) =>
        queryParams.push({ name: "rawMaterial", value: item })
      );
      filters.category?.forEach((item) =>
        queryParams.push({ name: "category", value: item })
      );
      filters.color?.forEach((item) =>
        queryParams.push({ name: "color", value: item })
      );
      filters.size?.forEach((item) =>
        queryParams.push({ name: "size", value: item })
      );
      // filters.productName?.forEach((item) =>
      //   queryParams.push({ name: "productName", value: item })
      // );
      setParams(queryParams);
    }
  };

  return (
    <>
      <h1 className="font-bold">
        Total : {metaData?.total} available shoes in the inventory
      </h1>

      <Input
        style={{ width: "220px" }}
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      <Button onClick={() => deleteMultipleProducts()}>Delete</Button>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
    // <p>hi</p>
  );
};

export default ProductData;
