import { useState } from "react";
import { useSalesHistoryQuery } from "../../../redux/features/sales/salesApi";
import { TSales } from "../../../types/sales.types";

const TotalSales = () => {
  // State to store search input for each column
  const [searchInputs, setSearchInputs] = useState<TSales>({
    daily: "",
    weekly: "",
    monthly: "",
    yearly: "",
  });

  // api
  console.log("searchInputs", searchInputs);

  const filterValues = {
    daily: searchInputs.daily,
    weekly: searchInputs.weekly,
    monthly: searchInputs.monthly,
    yearly: searchInputs.yearly,
  };

  console.log(filterValues);
  const { data } = useSalesHistoryQuery(undefined);

  console.log("sales", data);

  return (
    <div className="scrollable-container">
      <table className="scrollable-container">
        <thead>
          <tr className="">
            <th>ProductId </th>

            <th>Buyer</th>
            <th>Quantity</th>
            <th>Date of Sales</th>
            <th>totalAmount</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((product) => (
            <tr key={product._id}>
              <td>{product.productId}</td>
              <td>{product.buyer}</td>
              <td>{product.quantity}</td>
              <td>{product.dateOfSales.slice(0, 10)}</td>
              <td>{product.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TotalSales;
