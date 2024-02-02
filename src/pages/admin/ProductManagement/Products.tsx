import { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../../redux/features/Acadmeic-Semester/productApi";
import SingleProduct from "./SingleProduct";
import "./styles.products.css";
import { SearchInputs, filteredData } from "../../../types/product.types";

const Products = () => {
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
  });

  // api
  console.log("searchInputs", searchInputs);

  const filterValues = {
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

  const { data } = useGetAllProductsQuery(filterValues);

  const handleSearchInputChange = (
    field: string,
    value: string | number | undefined
  ) => {
    setSearchInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filtered = useMemo(
    () => filteredData(data, searchInputs),
    [data, searchInputs]
  );

  console.log("filter", filtered);

  return (
    <div className="scrollable-container">
      <table>
        <thead>
          <tr className="">
            <th>Cover </th>
            <th>
              {/* Search inputs for each column */}
              Name
            </th>
            <th>
              {/* Search inputs for each column */}
              <div className="search-inputs">
                <input
                  type="text"
                  placeholder="Search by"
                  value={searchInputs.brand}
                  onChange={(e) =>
                    handleSearchInputChange("brand", e.target.value)
                  }
                />
              </div>
              Brand
            </th>
            <th>Model</th>
            <th>Category</th>
            <th>Color</th>
            <th>Created </th>
            <th>Gender</th>
            <th>Price</th>
            <th>
              {/* Search inputs for each column */}
              <div className="search-inputs">
                <input
                  type="text"
                  placeholder="Search by"
                  value={searchInputs.quantity}
                  onChange={(e) =>
                    handleSearchInputChange("quantity", e.target.value)
                  }
                />
              </div>
              Quantity
            </th>
            <th> Material</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <SingleProduct products={data}></SingleProduct>
      </table>
    </div>
  );
};

export default Products;
