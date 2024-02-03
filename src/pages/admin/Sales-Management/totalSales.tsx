import { useSalesHistoryQuery } from "../../../redux/features/sales/salesApi";
import { TOrder } from "../../../types/sales.types";

const TotalSales = () => {
  const { data } = useSalesHistoryQuery(undefined);

  // console.log(filterValues);
  // console.log("sales", data);

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
          {data?.data?.map((product: TOrder) => (
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
