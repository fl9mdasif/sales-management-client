/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetMyPolishReqQuery } from "../../redux/features/Product/shoePolishApi";
import { TTableData } from "./Products";
import { Pagination, Table, TableColumnsType } from "antd";

const PolishStatus = () => {
  const [page, setPage] = useState(1);
  const {
    data: productData,
    // isLoading,
    isFetching,
  } = useGetMyPolishReqQuery(undefined);

  const metaData = productData?.meta as any;
  // console.log("m", metaData);

  const tableData: any = productData?.data?.map(
    ({ _id, userId, polishType, shineLevel, instructions, status }: any) => ({
      key: _id,
      userId,
      polishType,
      shineLevel,
      instructions,
      status,
    })
  );
  //   console.log("cover", tableData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "User",
      key: "userId",
      dataIndex: "userId",
    },

    {
      title: "Shine level",
      key: "shineLevel",
      dataIndex: "shineLevel",
    },
    {
      title: "Polish Type",
      key: "polishType",
      dataIndex: "polishType",
    },

    // gender
    {
      title: "status",
      key: "status",
      //   dataIndex: "status",
      render: (item) => {
        // console.log(item);
        return <p className=" font-bold text-red-500">{item.status}</p>;
      },
    },

    // {
    //   title: "Action",
    //   key: "x",
    //   render: (item) => {
    //     console.log(item);
    //     return (
    //       <Space>
    //         {/* <Link to={`/seller/${item.key}`}> */}
    //         <Button className="bg-green-600 font-bold text-white">Order</Button>
    //         {/* </Link> */}
    //         {/* order modal  */}
    //       </Space>
    //     );
    //   },
    //   width: "1%",
    // },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
    // <p>hi</p>
  );
};

export default PolishStatus;
