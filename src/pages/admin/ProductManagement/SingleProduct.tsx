const SingleProduct = ({ products }) => {
  // console.log("sp", products);
  const onEditButtonClick = (id: string) => {
    console.log(id);
  };
  const onDeleteButtonClick = (id: string) => {
    console.log(id);
  };

  return (
    <tbody>
      {products?.data?.map((product) => (
        <tr key={product._id}>
          <td>
            <img className="w-20  " src={product.coverPhoto} alt="product" />
          </td>
          <td>{product.productName}</td>
          <td>{product.brand}</td>
          <td>{product.model}</td>
          <td>{product.category}</td>
          <td>{product.color}</td>
          <td>{product.createdAt.slice(0, 10)}</td>
          <td>{product.gender}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.rawMaterial}</td>
          <td>{product.size}</td>
          <td>
            <p>{product.length}</p>

            <button onClick={() => onEditButtonClick("/")}>Edit</button>
            <button onClick={() => onDeleteButtonClick("/")}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SingleProduct;
