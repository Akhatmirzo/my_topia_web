import React, { useMemo, useState } from "react";
import { Button} from "flowbite-react";
import {
  useCreateEmployerMutation,
  useDeleteEmployerMutation,
  useGetEmployersQuery,
} from "../../store/api/employersApi";
import SuperTable from "../../components/Table/SuperTable";
import { createTable } from "../../utils/createTable";
import { PopUp } from "../../components/PopUp/PopUp";
import EditEmployer from "../../components/PopUp/Forms/EditEmployer";
import Loading from "../../components/Loadings/Loading";
import AddEmployer from "../../components/PopUp/Forms/AddEmployer";

export default function Employers() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState({
    isEdit: false,
    id: null,
  });
  const { data, isLoading, error, isError } = useGetEmployersQuery();
  const [CreateEmployer, result] = useCreateEmployerMutation();
  const [DeleteEmployer, deleteResult] = useDeleteEmployerMutation();

  const tableData = useMemo(() => {
    console.log(data);
    return createTable(data?.employers);
  }, [data]);

  const handleAddEmployer = async (data) => {
    setLoading(true);
    await CreateEmployer(data);

    if (result.isError) {
      setLoading(false);
      console.error(result.error);
      return;
    } else {
      setOpenModal(false);
      setLoading(false);
    }
  };

  const handleDeleteEmployer = async (id) => {
    setLoading(true);
    await DeleteEmployer(id);

    if (deleteResult.isError) {
      setLoading(false);
      console.error(deleteResult.error);
      return;
    }
    setLoading(false);
  };

  const EditClose = () => {
    setEdit({ isEdit: false, id: null });
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-3">
        <h1 className="dark:text-white text-3xl">Employers</h1>

        <Button onClick={() => setOpenModal(true)}>
          <span className="text-lg">Add Employer</span>
        </Button>
      </div>

      <div>
        {isError && (
          <div className="text-red-500 text-center">{error?.data?.message}</div>
        )}

        {!isError && (
          <SuperTable
            update={{ edit, setEdit }}
            deleteData={handleDeleteEmployer}
            table={tableData}
            hiddenKeys={["_id", "__v", "password"]}
          />
        )}
      </div>

      <PopUp openModal={edit.isEdit} setOpenModal={EditClose}>
        <EditEmployer edit={edit} setEdit={setEdit} />
      </PopUp>

      <PopUp openModal={openModal} setOpenModal={setOpenModal}>
        <AddEmployer AddEmployerFn={handleAddEmployer} />
      </PopUp>

      {isLoading || loading ? <Loading calc={"71px"} /> : ""}
    </div>
  );
}
