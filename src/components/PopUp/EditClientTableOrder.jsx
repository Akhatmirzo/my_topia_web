import React, { useMemo, useState } from "react";
import staticData from "../../store/staticData";
import images from "../../assets/images";
import { Button, Label, Select } from "flowbite-react";
import { useChangeTableOrderMutation } from "../../store/api/tablesApi";

export default function EditClientTableOrder({ table, setTable }) {
  const [orderStatus, setOrderStatus] = useState("pending");
  const [ChangeTableOrder] = useChangeTableOrderMutation();
  const positionStyle = useMemo(() => {
    if (table) {
      if (table.order.length > 0) {
        return { right: 0 };
      } else {
        return { right: "-100%" };
      }
    } else {
      return { right: "-100%" };
    }
  }, [table]);

  const totalPrice = useMemo(() => {
    return table?.order.reduce((sum, order) => sum + order.total_price, 0);
  }, [table]);

  const updateTableOrder = async (e) => {
    e.preventDefault();

    await ChangeTableOrder({ tableId: table._id, status: orderStatus });

    setTable(null);
  };

  return (
    <div
      className="w-full h-screen flex justify-end absolute top-0 -right-[100%] transition-all duration-300 bg-[rgba(0,0,0,0.4)]"
      style={positionStyle}
      onClick={() => {
        setTable(null);
      }}
    >
      <div
        className="w-1/2 h-full bg-rose-700 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end py-1">
          <div
            className="cursor-pointer"
            onClick={() => {
              setTable(null);
            }}
          >
            <img src={images.Delete} alt="delete icon" />
          </div>
        </div>
        <div className="h-[calc(100%-180px)] overflow-x-hidden overflow-y-auto flex flex-col gap-4">
          {table?.order.map((order) =>
            order.products.map((product) => (
              <div
                key={product._id}
                className="w-full flex items-start gap-[20px] p-2"
              >
                <div className="min-w-[80px] w-1/2 h-full rounded-[25px] bg-[#646982]">
                  <img
                    src={
                      staticData.SERVER_URL +
                      "/" +
                      product.product_id.images[0].path
                    }
                    alt="order-photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex items-start flex-col">
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-[18px] text-[#FDBF48] leading-[normal] font-[500]">
                      {product.product_id.name}
                    </h2>
                  </div>
                  <div className="w-full flex justify-between">
                    <h2 className="pt-[18px] text-[18px] text-[#36B75A] font-[400] leading-[normal]">
                      {product.totalPrice}
                      so'm
                    </h2>
                    {product?.additions?.length > 0 && (
                      <div className="">
                        <h3 className="text-[18px] text-[#36B75A] font-[400] leading-[normal]">
                          Addition
                        </h3>

                        <ul>
                          {product.additions.map((addition, index) => (
                            <li key={index}>{addition.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="flex flex-col items-center text-center">
            <div className="text-[18px] font-[600] leading-[24px] text-[#36B75A] uppercase">
              Umumiy:
            </div>
            <h2 className="text-[34px] font-[500] text-[#FDBF48] leading-[normal]">
              {totalPrice} so'm
            </h2>
          </div>
          <form className="flex items-end gap-3" onSubmit={updateTableOrder}>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select Status" />
              </div>
              <Select
                id="countries"
                required
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value={"pending"}>Pending</option>
                <option value={"paid"}>Paid</option>
              </Select>
            </div>

            <Button type="submit">Update</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
