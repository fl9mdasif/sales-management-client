import { useMemo, useState } from "react";
import {
  useDeleteProductsMutation,
  useGetAllProductsQuery,
} from "../../../redux/features/Product/productApi";
import SingleProduct from "./SingleProduct";
import "./styles.products.css";
import { SearchInputs, filteredData } from "../../../types/product.types";
import { toast } from "sonner";

const Products = () => {
  const [selectedShoes, setSelectedShoes] = useState<Set<string>>(new Set());
  const [deleteProducts, isLoading, error] = useDeleteProductsMutation();

  // deleteMultipleProducts
  const deleteMultipleProducts = async () => {
    // console.log("ll", [...selectedShoes]);
    const result = await deleteProducts([...selectedShoes]);

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

  // State to store search input for each column

  const [searchInputs, setSearchInputs] = useState<SearchInputs>({
    sortBy: "startDate",
    sortOrder: "asc",
    minPrice: 0,
    maxPrice: 1000,
    releasedAt: "",
    brand: "",
    model: "",
    category: "",
    color: "",
    gender: "",
    rawMaterial: "",
    size: "",
    productName: "",
  });

  // api

  const filterValues = {
    productName: searchInputs.productName,
    brand: searchInputs.brand,
    category: searchInputs.category,
    color: searchInputs.color,
    gender: searchInputs.gender,
    maxPrice: searchInputs.maxPrice,
    minPrice: searchInputs.minPrice,
    model: searchInputs.model,
    rawMaterial: searchInputs.rawMaterial,
    releasedAt: searchInputs.releasedAt,
    size: searchInputs.size,
    sortBy: searchInputs.sortBy,
    sortOrder: searchInputs.sortOrder,
  };

  const { data, refetch } = useGetAllProductsQuery(filterValues);

  const handleSearchInputChange = (
    field: string,
    value: string | number | undefined
  ) => {
    setSearchInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // set product as filter requirements
  useMemo(() => filteredData(data, searchInputs), [data, searchInputs]);
  // console.log("searchInputs", searchInputs);
  // console.log("filter", data);

  // Extract unique brands from data
  const uniqueBrands = useMemo(() => {
    return [...new Set(data?.data?.map((item) => item.brand))];
  }, [data]);
  // Extract unique color  from data
  const uniqueColors = useMemo(() => {
    return [...new Set(data?.data?.map((item) => item.color))];
  }, [data]);
  // Extract unique size  from data
  const uniqueSize = useMemo(() => {
    return [...new Set(data?.data?.map((item) => item.size))];
  }, [data]);
  // Extract unique gender  from data
  const uniqueGender = useMemo(() => {
    return [...new Set(data?.data?.map((item) => item.gender))];
  }, [data]);

  return (
    <div className="">
      <h1 className="font-bold text-green-700 text-2xl mb-2">
        Product Dashboard
      </h1>
      <div>
        <p className="text-xl text-yellow-700 mb-5">
          Total {data?.meta?.total} products in inventory
        </p>
      </div>
      <div className="filter-container flex gap-3 flex-wrap mb-4">
        {/* Add filter components here */}
        {/* sort by Price */}
        <div className="filter-item ">
          <div className="flex flex-col">
            <label> Name:</label>
            <input
              type="text"
              placeholder="Search by"
              value={searchInputs.productName}
              onChange={(e) =>
                handleSearchInputChange("productName", e.target.value)
              }
            />
          </div>
        </div>
        {/* //color */}
        <div className="filter-item color">
          <label>color :</label>
          <select
            value={searchInputs.color}
            onChange={(e) => handleSearchInputChange("color", e.target.value)}
          >
            <option value="">All Colors</option>
            {uniqueColors?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* brand */}
        <div className="filter-item brand">
          <label>Brand:</label>
          <select
            value={searchInputs.brand}
            onChange={(e) => handleSearchInputChange("brand", e.target.value)}
          >
            <option value="">All Brands</option>
            {uniqueBrands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        {/* gender */}
        <div className="filter-item ">
          <label>Gender:</label>
          <select
            value={searchInputs.gender}
            onChange={(e) => handleSearchInputChange("gender", e.target.value)}
          >
            <option value="">All</option>
            {uniqueGender?.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        {/* size */}
        <div className="filter-item ">
          <label>Size:</label>
          <select
            value={searchInputs.size}
            onChange={(e) => handleSearchInputChange("size", e.target.value)}
          >
            <option value="">All size</option>
            {uniqueSize?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* sort by Price */}
        <div className="flex gap-3 ">
          <div className="flex flex-col gap-2">
            <label>Min Price:</label>
            <input
              type="text"
              placeholder="min"
              value={searchInputs.minPrice}
              onChange={(e) =>
                handleSearchInputChange("minPrice", e.target.value)
              }
            />
          </div>

          {/* max price */}
          <div className="flex flex-col gap-2">
            <label>Max Price:</label>
            <input
              type="text"
              placeholder="Search by"
              value={searchInputs.maxPrice}
              onChange={(e) =>
                handleSearchInputChange("maxPrice", e.target.value)
              }
            />
          </div>
        </div>

        {/* // delete products */}

        {error && <p>Error: {error}</p>}
      </div>

      <div className="scrollable-container">
        <table className="scrollable-container">
          <thead>
            <tr className="">
              <th>
                <button
                  onClick={() => deleteMultipleProducts()}
                  className="bg-red- text-red-500 px- py-1 rounded-md "
                >
                  Delete
                </button>{" "}
              </th>
              <th>Cover </th>
              <th>
                {/* Search inputs for each column */}
                Name
              </th>
              <th>Brand</th>
              <th>Model</th>
              <th>Category</th>
              <th>Color</th>
              <th>Created </th>
              <th>Gender</th>
              <th>Price</th>
              <th>Quantity</th>
              <th> Material</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <SingleProduct
            products={data}
            onChange={(id: string, checked: boolean) => {
              const newSelectedShoes = new Set(selectedShoes);
              if (checked) {
                newSelectedShoes.add(id);
              } else {
                newSelectedShoes.delete(id);
              }
              setSelectedShoes(newSelectedShoes);
            }}
            selectedShoes={selectedShoes}
            refetch={refetch}
          ></SingleProduct>
        </table>
      </div>
    </div>
  );
};

export default Products;
