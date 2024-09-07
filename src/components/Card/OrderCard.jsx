import React from "react";
import { useDeleteOrderMutation } from "../../store/api/orderApi";
import { uid } from "uid";

function getTimeOrder(time) {
  let newTimeArr = time.split("T");
  let oclock = newTimeArr[1].split(".")[0];

  return [newTimeArr[0], oclock];
}

export default function OrderCard({
  role,
  order: { _id, createdAt, total_price, products, table_number, status },
}) {
  const [deleteOrder] = useDeleteOrderMutation();
  return (
    <div
      title={"Table number: " + table_number}
      className="w-full max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-5 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Order Time:
        </h5>

        <h6 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          {getTimeOrder(createdAt).map((time) => (
            <span key={uid()} className="block text-lg text-right">{time}</span>
          ))}
        </h6>
      </div>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold mr-1">Total:</span>
        <span className="text-4xl font-bold">{total_price}</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /so'm
        </span>
      </div>

      <table className="border w-full flex border-collapse text-base leading-tight text-gray-500 dark:text-gray-400">
        <thead className="w-full">
          <tr className="w-full flex flex-col items-start">
            <th className="border w-full p-1 text-left">Status</th>
            <th className="border w-full p-1 text-left">Table Num</th>
            <th className="border w-full p-1 text-left">Product Count</th>
          </tr>
        </thead>
        <tbody className="w-full">
          <tr className="w-full flex flex-col items-start">
            <td className="w-full border p-1">{status}</td>
            <td className="w-full border p-1">{table_number}</td>
            <td className="w-full border p-1">{products.length}</td>
          </tr>
        </tbody>
      </table>

      <ul className="space-y-5 my-7">
        {products.map(({ product_id, quantity }) => (
          <li key={uid()} className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              {quantity} / ta
            </span>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              {product_id.name}
            </span>
          </li>
        ))}
      </ul>
      {role === "admin" && (
        <button
          type="button"
          onClick={() => deleteOrder({ id: _id })}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Delete
        </button>
      )}
    </div>
  );
}
