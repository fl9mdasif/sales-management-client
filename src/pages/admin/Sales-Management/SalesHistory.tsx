import { useMemo, useState } from "react";
import { useSalesHistoryQuery } from "../../../redux/features/sales/salesApi";
import { salesFilteredData } from "../../../types/sales.types";

const SalesHistory = () => {
  // State to store search input for each column
  type TInputField = {
    history: string;
  };
  const [searchInputs, setSearchInputs] = useState<TInputField>({
    history: "",
  });

  // api
  const filterValues = {
    ...searchInputs,
  };

  const { data } = useSalesHistoryQuery(filterValues);

  const handleSearchInputChange = (
    field: string,
    value: string | number | undefined
  ) => {
    setSearchInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useMemo(() => salesFilteredData(data, searchInputs), [data, searchInputs]);
  const period = data?.data[0]?.period;
  //   console.log("period", data?.data[0].data);
  return (
    <div>
      <h1 className="text-2xl bold mb-4 text-center">Sales History</h1>
      {/* Time period filter */}
      <div className="filter-item color">
        <label>Time Period:</label>
        <select
          value={searchInputs.history}
          defaultValue={period}
          onChange={(e) => handleSearchInputChange("history", e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Table */}
      <div className="scrollable-container">
        <table className="scrollable-container">
          <thead>
            <tr className="">
              <th>{period}</th>
              <th>Sales Amount</th>
              <th>Number of Sales </th>
            </tr>
          </thead>
          <tbody>
            {data?.data[0]?.data?.map((product, index) => (
              <tr key={index + 1}>
                <td>
                  {product.week || product.day || product.month || product.year}
                </td>
                <td>{product.totalSales}</td>
                <td>{product.averageQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;
