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
import { toast } from "react-toastify";

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
    return createTable(data?.employers);
  }, [data]);

  const handleAddEmployer = async (data) => {
    setLoading(true);
    await CreateEmployer(data);

    if (result.isError) {
      setLoading(false);
      toast.error(result.error);
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
      toast.error(deleteResult.error);
      return;
    }
    setLoading(false);
  };

  const EditClose = () => {
    setEdit({ isEdit: false, id: null });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <h1 className="dark:text-white text-3xl mysm:text-xl">Employers</h1>

        <Button onClick={() => setOpenModal(true)}>
          <span className="text-lg mysm:text-sm">Add Employer</span>
        </Button>
      </div>

      <div className="w-[calc(100vw-24px)] lg:w-full">
        {isError && (
          <div className="text-red-500 text-center">{error?.data?.message}</div>
        )}

        {!isError && (
          <SuperTable
            update={{ edit, setEdit }}
            deleteData={handleDeleteEmployer}
            table={tableData}
            hiddenKeys={["_id", "__v", "password", "createdAt", "updatedAt"]}
          />
        )}
      </div>

      <PopUp openModal={edit.isEdit} setOpenModal={EditClose}>
        <EditEmployer edit={edit} setEdit={setEdit} />
      </PopUp>

      <PopUp openModal={openModal} setOpenModal={setOpenModal}>
        <AddEmployer AddEmployerFn={handleAddEmployer} />
      </PopUp>

      {isLoading || loading ? <Loading /> : ""}
    </div>
  );
}
