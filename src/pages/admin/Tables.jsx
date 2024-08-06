import { Button } from "flowbite-react";
import React, { useMemo, useState } from "react";
import {
  useCreateTableMutation,
  useGetTablesQuery,
} from "../../store/api/tablesApi";
import { PopUp } from "../../components/PopUp/PopUp";
import Loading from "../../components/Loadings/Loading";
import AddTable from "../../components/PopUp/Forms/AddTable";

export default function Tables() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState({
    isEdit: false,
    id: null,
  });
  const { data, isError, isLoading, error } = useGetTablesQuery();
  const [addTable, result] = useCreateTableMutation();
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

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-3">
        <h1 className="dark:text-white text-5xl">Tables</h1>

        <Button onClick={() => setOpenModal(true)}>
          <span className="text-2xl">Add Table</span>
        </Button>
      </div>

      <div className="w-full flex gap-5">
        {!isError &&
          data?.tables.map((table) => (
            <div
              className="w-[300px] h-[200px] border-2 p-4 rounded-lg"
              style={{
                backgroundColor: table.empty
                  ? "rgba(0, 255, 28, 0.3)"
                  : "rgba(255, 0, 4, 0.3)",
              }}
            >
              <h2 className="text-4xl dark:text-white font-bold tracking-wider text-center">
                Number: <span className="">{table.table_number}</span>
              </h2>
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
