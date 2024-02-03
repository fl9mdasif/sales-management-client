export type TSales = {
  daily: string;
  weekly: string;
  monthly: string;
  yearly: string;
};

export type TOrder = {
  productId: string;
  buyer: string;
  quantity: number;
  totalAmount?: number;
  dateOfSales: Date;
};

// Memoized filtered data based on search inputs
export const salesFilteredData = (data, searchInputs) => {
  if (!data) return [];

  return data?.data.filter((sales) => {
    const { averageQuantity, totalSales } = sales || {}; // Destructure sales with default value {}

    // Check if the properties are defined before using 'includes'
    return (
      averageQuantity &&
      averageQuantity.includes(searchInputs.averageQuantity) &&
      totalSales &&
      totalSales.includes(searchInputs.totalSales)
    );
  });
};
