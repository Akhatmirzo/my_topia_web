import { Button } from "flowbite-react";
import React, { useMemo, useState } from "react";
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTablesQuery,
} from "../store/api/tablesApi";
import { PopUp } from "../components/PopUp/PopUp";
import Loading from "../components/Loadings/Loading";
import AddTable from "../components/PopUp/Forms/AddTable";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

function calculateOrder(order) {
  return order.reduce((acc, ord) => acc + ord.total_price, 0);
}

export default function Tables() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState({
    isEdit: false,
    id: null,
  });
  const { data, isError, isLoading, error } = useGetTablesQuery();
  const [addTable, result] = useCreateTableMutation();
  const [deleteTable] = useDeleteTableMutation();
  const EditClose = () => {
    setEdit({ isEdit: false, id: null });
  };

  const addTableFn = async (data) => {
    setLoading(true);
    await addTable(data);

    if (result.isError) {
      console.error(result.error);
    } else {
      setOpenModal(false);
      setLoading(false);
    }
  };

  const userAuth = useMemo(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      return role;
    } else {
      return null;
    }
  }, []);

  console.log(data);

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-3">
        <h1 className="dark:text-white text-3xl">Tables</h1>

        <Button onClick={() => setOpenModal(true)}>
          <span className="text-lg">Add Table</span>
        </Button>
      </div>

      <div className="w-full flex flex-wrap gap-5">
        {!isError &&
          data?.tables.map((table) => (
            <div
              className="w-[300px] min-h-[250px] border-2 p-4 rounded-lg"
              style={{
                backgroundColor: table.empty
                  ? "rgba(0, 255, 28, 0.3)"
                  : "rgba(255, 0, 4, 0.3)",
              }}
            >
              <h2 className="text-2xl dark:text-white font-bold tracking-wider text-center">
                Number: <span className="">{table.table_number}</span>
              </h2>

              <hr />

              <div
                className="w-full h-2/3 flex flex-col"
                style={
                  userAuth === "admin"
                    ? { height: "calc(100%-33.3%) !important" }
                    : {}
                }
              >
                <div className="h-full">
                  {!table.empty
                    ? table.order.map((order) => (
                        <ul className="flex gap-1 items-center flex-wrap">
                          {order.products.map((product) => (
                            <li>
                              <span className="text-lg font-bold tracking-wider text-slate-300">
                                {product.product_id.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ))
                    : "This table is empty."}
                </div>

                <h3 className="text-lg text-white">
                  Jami: <span>{calculateOrder(table.order)} / so'm</span>{" "}
                </h3>
              </div>

              {userAuth === "admin" && (
                <>
                  <hr />
                  <div className="p-4 flex justify-between gap-3">
                    <Button
                      color={"red"}
                      onClick={() => deleteTable({ id: table._id })}
                    >
                      {" "}
                      <MdDeleteForever size={15} />{" "}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>

      <PopUp openModal={edit.isEdit} setOpenModal={EditClose}></PopUp>

      <PopUp openModal={openModal} setOpenModal={setOpenModal}>
        <AddTable addTableFn={addTableFn} />
      </PopUp>

      {isLoading || loading ? <Loading calc={"71px"} /> : ""}
    </div>
  );
}
