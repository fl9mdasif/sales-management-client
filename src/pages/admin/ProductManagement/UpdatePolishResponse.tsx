/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetMyPolishReqQuery,
  useUpdatePolishStatusMutation,
} from "../../../redux/features/Product/shoePolishApi";
import {
  Button,
  Form,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { TTableData } from "../../buyer/Products";
import { formItemLayout } from "../../../constants/global";
import { toast } from "sonner";

const UpdatePolishResponse = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const {
    data: productData,
    // isLoading,
    isFetching,
    refetch,
  } = useGetMyPolishReqQuery(undefined);

  const [updatePolishStatus] = useUpdatePolishStatusMutation();

  const openOrderModal = (id: string) => {
    setIsOrderModalOpen(true);
    setSelectedProductId(id);
    // console.log(id);
  };

  const handleOrderModalOk = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOrderModalCancel = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };

  // modal onFInish
  const onFinish = async (updatedData: any) => {
    const toastId = toast.loading("Creating...");
    try {
      setIsOrderModalOpen(false);

      const res: any = await updatePolishStatus({
        polishId: selectedProductId as string,
        updatedData: updatedData,
      });

      if (res?.data?.success) {
        toast.success("Polish status updated successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(data);
  };

  const [page, setPage] = useState(1);

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
      render: (item) => {
        return <p className="w-24">{item.key}</p>;
      },
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
        return (
          <div className="  flex-1 flex  gap-2 items-center">
            <div
              className={`size-3 rounded-full 
            ${item.status === "pending" ? "bg-red-500" : null} 
            ${item.status === "in-progress" ? "bg-yellow-500" : null} 
            ${item.status === "completed" ? "bg-green-500" : null} 
           `}
            ></div>
            <p className={``}>{item.status}</p>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log(item);
        return (
          <Space>
            {/* <Link to={`/seller/${item.key}`}> */}
            <Button
              onClick={() => {
                if (item.key) {
                  openOrderModal(item.key);
                }
              }}
              className="bg-green-600 font-bold text-white"
            >
              Update Status
            </Button>
            {/* </Link> */}
            {/* order modal  */}
            <Modal
              title="Order Modal"
              open={isOrderModalOpen}
              onOk={handleOrderModalOk}
              onCancel={handleOrderModalCancel}
            >
              <Form
                {...formItemLayout}
                variant="filled"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="Order Status" name="status">
                  <Select>
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="in-progress">
                      In-Progress
                    </Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button
                    className="bg-green-600"
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        );
      },
      width: "1%",
    },
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

export default UpdatePolishResponse;
