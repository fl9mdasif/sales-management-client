/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import PHForm from "../../components/form/PhForm";
import PHInput from "../../components/form/PHInput";
import { toast } from "sonner";
import { useVerifyProductQuery } from "../../redux/features/Product/productApi";
import { useState } from "react";
import { TProduct } from "../../types/product.types";
import "../../styles/product.styles.css";

const VerifyProduct = () => {
  const defaultValues = {
    // shoeId: "65b8725b578b4ec3dcc9988f",
    shoeId: "",
  };

  const [productId, setProductId] = useState<string>("");
  const [product, setProduct] = useState<TProduct | undefined>(undefined);

  const { data: verifyProduct } = useVerifyProductQuery(productId);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Loading...");
    try {
      setProductId(data.shoeId);

      setProduct(verifyProduct?.data);

      console.log("v", product);
      if (verifyProduct) {
        toast.success(
          "This is a authentic product, verification successfully",
          { id: toastId, duration: 2000 }
        );
      } else {
        toast.error("Product is not authentic, Shoe verified failed", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      console.log("err: ", error);
    }

    // const navigateReg = () => {
    //   navigate("/registration");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-4">
        <h1 className="text-2xl   font-bold py-4 text-blue-700">
          Verify product with unique ID,
        </h1>
        <p className="text-red-300">Copy a product's unique id </p>
      </div>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="shoeId" label="Product Id" />
        <Button htmlType="submit">Verify Product</Button>
      </PHForm>

      <div className="mt-4">
        {product && (
          <div className="product-details-container">
            <img
              src={product.coverPhoto}
              alt={`${product.brand} ${product.model}`}
              className="product-cover-photo"
            />
            <div className="product-info">
              <p>id: {product._id}</p>
              <h1>{product.productName}</h1>
              <p className="price">${product.price.toFixed(2)}</p>
              <p>Quantity: {product.quantity}</p>
              <p>
                Description:{" "}
                {product.productDescription || "No description available"}
              </p>
              <h2>Details</h2>
              <p>Brand: {product.brand}</p>
              <p>Model: {product.model}</p>
              <p>Size: {product.size}</p>
              <p>Category: {product.category}</p>
              <p>Gender: {product.gender}</p>
              <p>Color: {product.color}</p>
              <p>Material: {product.rawMaterial}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyProduct;
