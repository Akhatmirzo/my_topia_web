import React, { useEffect, useRef } from "react";
import { getTimeOrder } from "../../utils/helpers";

export default function CheckTemplate({ data, setIsPdfChek, isPdfChek }) {
  const { _id, createdAt, total_price, products, table_number, status } =
    data || {};
  const pdfRef = useRef();

  useEffect(() => {
    if (pdfRef.current) {
      setIsPdfChek(pdfRef);
    }
  }, [pdfRef, setIsPdfChek, isPdfChek, data]);

  return (
    <div
      ref={pdfRef}
      style={{
        width: "80mm",
        padding: "2mm",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sarlavha */}
      <h2
        style={{ textAlign: "center", marginBottom: "5mm", fontSize: "25px" }}
      >
        MayTopia
      </h2>

      {/* Order info */}
      <p>Time: {getTimeOrder(createdAt).join(", ")}</p>
      <p>Table Number: {table_number}</p>
      <p>Status: {status}</p>

      <br />
      {/* Products */}
      <div style={{ marginBottom: "5mm", border: "1px solid #000" }}>
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              marginBottom: "5mm",
              paddingLeft: "2mm",
              paddingRight: "2mm",
            }}
          >
            <span style={{ display: "block", fontWeight: "bold" }}>
              {product.quantity} ta{" "}
              {product.additions.length > 0
                ? product.additions.map((addition, i) => (
                    <span key={i}>
                      {" "}
                      {addition.name}li
                      {product.additions.length > 1 && product.additions.length - 1 !== i
                        ? ","
                        : ""}
                    </span>
                  ))
                : null}{" "}
              {product.product_id.name}
            </span>
            <span style={{ display: "block" }}>{product.totalPrice} so'm</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <hr />
      <p style={{ padding: "2mm", fontSize: "18px" }}>
        Total: {total_price} so'm
      </p>
      <hr />

      {/* Thank you note */}
      <p style={{ textAlign: "center" }}>Thank you for dining at our MayTopia Restaurant</p>
    </div>
  );
}
