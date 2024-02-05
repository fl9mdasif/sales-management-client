import { useSalesHistoryQuery } from "../../../redux/features/sales/salesApi";
import { TOrder } from "../../../types/sales.types";

const TotalSales = () => {
  const { data } = useSalesHistoryQuery(undefined);

  // console.log(filterValues);
  // console.log("sales", data.data.length);

  return (
    <div className="scrollable-container">
      <h1 className="text-2xl bold mb-4 text-center">Total sales</h1>

      <h1>Total sales {data?.data?.length}</h1>
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
