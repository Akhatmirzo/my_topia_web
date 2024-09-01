import { Button } from "flowbite-react";
import React, { useMemo, useState } from "react";
import {
  useCategoryDeleteMutation,
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../store/api/categoriesApi";
import SuperTable from "../../components/Table/SuperTable";
import { createTable } from "../../utils/createTable";
import { PopUp } from "../../components/PopUp/PopUp";
import EditCategory from "../../components/PopUp/Forms/EditCategory";
import AddCategory from "../../components/PopUp/Forms/AddCategory";
import Loading from "../../components/Loadings/Loading";

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState({
    isEdit: false,
    id: null,
  });
  const [CreateCategory, result] = useCreateCategoryMutation();
  const [DeleteCategory, deleteResult] = useCategoryDeleteMutation();
  const { data, isLoading, isError } = useGetAllCategoriesQuery();

  const table = useMemo(() => {
    return createTable(data?.categories);
  }, [data]);

  const EditClose = () => {
    setEdit({ isEdit: false, id: null });
  };

  const create = async (data) => {
    setLoading(true);
    await CreateCategory(data);

    if (result.isError) {
      setLoading(false);
      console.error(result.error);
      return;
    } else {
      setOpenModal(false);
      setLoading(false);
    }
  };

  const deleteCategory = async ({ id }) => {
    setLoading(true);
    await DeleteCategory({ categoryId: id });
    setLoading(false);
    if (deleteResult.isError) {
      console.error(deleteResult.error);
      return;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <h1 className="dark:text-white text-3xl">Categories</h1>

        <Button onClick={() => setOpenModal(true)}>
          <span className="text-lg">Add Category</span>
        </Button>
      </div>

      <div>
        {!isError && (
          <SuperTable
            update={{ edit, setEdit }}
            deleteData={deleteCategory}
            table={table}
            hiddenKeys={["_id", "image"]}
          />
        )}
      </div>

      <PopUp openModal={edit.isEdit} size={"md"} setOpenModal={EditClose}>
        <EditCategory edit={edit} setEdit={setEdit} />
      </PopUp>

      <PopUp openModal={openModal} size={"md"} setOpenModal={setOpenModal}>
        <AddCategory AddCategoryFn={create} />
      </PopUp>

      {isLoading || loading ? <Loading /> : ""}
    </div>
  );
}
