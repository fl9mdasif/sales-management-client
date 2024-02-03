import { useState } from "react";
import { useSalesHistoryQuery } from "../../../redux/features/sales/salesApi";
import { TSales } from "../../../types/sales.types";

const SalesHistory = () => {
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
            <th>period </th>

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
      </table>
    </div>
  );
};
export default SalesHistory;
