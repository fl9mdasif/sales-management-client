export type TProduct = {
  brand: string;
  category: string;
  color: string;
  coverPhoto: string;
  createdAt: string;
  gender: string;
  model: string;
  price: number;
  productName: string;
  quantity: number;
  rawMaterial: string;
  size: string;
};

export interface SearchInputs {
  sortBy: string;
  sortOrder: string;
  minPrice: number;
  maxPrice: number;
  releasedAt: string;
  brand: string;
  model: string;
  size: string;
  category: string;
  color: string;
  gender: string;
  rawMaterial: string;
}

// Memoized filtered data based on search inputs
export const filteredData = (data, searchInputs) => {
  if (!data) return [];
  console.log("fi", data, searchInputs);

  return data.data.filter((product: TProduct) => {
    // Custom logic for each column's filteringc
    const lowerBrand = (product.brand || "").toLowerCase();
    const lowerCategory = (product.category || "").toLowerCase();
    const lowerColor = (product.color || "").toLowerCase();
    const lowerGender = (product.gender || "").toLowerCase();
    const lowerRawMaterial = (product.rawMaterial || "").toLowerCase();
    const lowerSize = (product.size || "").toLowerCase();
    const lowerReleasedAt = (product.createdAt || "").toLowerCase();
    const lowerModel = (product.model || "").toLowerCase();

    return (
      lowerBrand.includes(searchInputs.brand.toLowerCase()) &&
      lowerCategory.includes(searchInputs.category.toLowerCase()) &&
      lowerColor.includes(searchInputs.color.toLowerCase()) &&
      lowerGender.includes(searchInputs.gender.toLowerCase()) &&
      lowerRawMaterial.includes(searchInputs.rawMaterial.toLowerCase()) &&
      lowerSize.includes(searchInputs.size.toLowerCase()) &&
      lowerModel.includes(searchInputs.model.toLowerCase()) &&
      (product.quantity !== undefined ? product.quantity : 0) >=
        searchInputs.minQuantity &&
      (product.quantity !== undefined ? product.quantity : 0) <=
        searchInputs.maxQuantity &&
      (product.price !== undefined ? product.price : 0) >=
        searchInputs.minPrice &&
      (product.price !== undefined ? product.price : 0) <=
        searchInputs.maxPrice &&
      lowerReleasedAt.includes((searchInputs.releasedAt || "").toLowerCase())
    );
  });
};
