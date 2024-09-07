import React from "react";
import { Table } from "flowbite-react";
import { uid } from "uid";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function SuperTableItem({ keys, index, tableItem, update, deleteData }) {
  console.log(keys?.length);
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4 mysm:p-2 w-[30px] text-center">{index + 1}</Table.Cell>
      {keys?.map((key) => (
        <Table.Cell
          key={uid()}
          className={`p-4 mysm:p-2`}
          style={{width: `calc(100% / ${keys?.length})`}}
        >
          {tableItem[key]}
        </Table.Cell>
      ))}
      <Table.Cell className="w-min flex items-center gap-3">
        <button
          onClick={() =>
            update.setEdit({ ...update.edit, isEdit: true, id: tableItem._id })
          }
          className="group relative flex items-stretch justify-center p-2 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-blue-700 text-white focus:ring-4 focus:ring-blue-300 enabled:hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-full"
        >
          <CiEdit size={20} />
        </button>
        <button onClick={() => deleteData({id: tableItem._id})} className="group relative flex items-stretch justify-center p-2 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 rounded-full">
          <RiDeleteBin6Fill size={20} />
        </button>
      </Table.Cell>
    </Table.Row>
  );
}
