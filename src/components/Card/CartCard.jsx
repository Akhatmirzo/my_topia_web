import React from "react";
import images from "../../assets/images";
import staticData from "../../store/staticData";

export default function CartCard({
  cart,
  increment,
  decrement,
  deleteItem,
  role,
}) {
  return (
    <div
      key={cart.itemId}
      style={
        role === "employer"
          ? {
              width: "max-content",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              overflow: "hidden",
              borderRadius: "15px",
              backgroundColor: "rgba(50, 65, 81, 1)",
            }
          : {}
      }
      className="w-full flex items-start gap-[20px]"
    >
      <div
        style={role === "employer" ? { width: "300px" } : {}}
        className="min-w-[80px] w-full h-full rounded-[25px] bg-[#646982]"
      >
        <img
          src={staticData.SERVER_URL + "/" + cart.image}
          alt="order-photo"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        style={
          role === "employer"
            ? { width: "max-content", padding: "10px 10px 10px 0px" }
            : {}
        }
        className="w-full flex items-start flex-col"
      >
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[18px] text-[#FDBF48] leading-[normal] font-[500]">
            {cart.name}
          </h2>
          <div
            className="cursor-pointer"
            onClick={() => deleteItem(cart.itemId)}
          >
            <img src={images.Delete} alt="delete icon" />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <h2 className="pt-[18px] text-[18px] text-[#36B75A] font-[400] leading-[normal]">
            {cart.totalPrice} so'm
          </h2>
          {cart?.additions?.length > 0 && (
            <div className="">
              <h3 className="text-[18px] text-[#36B75A] font-[400] leading-[normal]">
                Addition
              </h3>

              <ul>
                {cart.additions.map((addition, index) => (
                  <li key={index}>{addition.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-[171px] flex items-center justify-between pt-[13px]">
          <div className="text-[18px] text-[#181C2E] font-[400] leading-[normal]">
            <span>{cart?.options?.name}</span>
          </div>
          <div className="flex items-center gap-[19px]">
            <div
              className="cursor-pointer"
              onClick={() => decrement(cart.itemId)}
              data-name="product-delete"
            >
              <img src={images.Minus} alt="" />
            </div>
            <div className="text-[16px] font-[500] text-[#FDBF48] leading-[normal]">
              {cart.quantity}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => increment(cart.itemId)}
            >
              <img src={images.Plus} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
