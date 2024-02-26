/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const filterValues: any = {
    ...searchInputs,
  };

  const { data }: any = useSalesHistoryQuery(filterValues);

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
  const sales: any = data?.data[0]?.data;
  console.log("period", sales);
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
              <th className="mr-4">{period} sales</th>
              <th className="mr-4">Sales Amount</th>
              <th>Number of Sales </th>
            </tr>
          </thead>
          <tbody>
            {data?.data[0]?.data?.map((product: any, index: any) => (
              <tr key={index + 1}>
                <td>{product.period}</td>
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
