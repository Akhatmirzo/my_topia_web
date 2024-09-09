import React, { useMemo, useState } from "react";
import { Button, FileInput, Label } from "flowbite-react";
import {
  useCategoryEditMutation,
  useGetAllCategoriesQuery,
} from "../../../store/api/categoriesApi";
import Skeleton from "../../skeletons/Skeleton";
import { convertToBase64 } from "../../../utils/convertToBase64";
import staticData from "../../../store/staticData";
import { toast } from "react-toastify";

export default function EditCategory({ edit, setEdit }) {
  const [image, setImage] = useState();
  const [EditCategory, result] = useCategoryEditMutation();
  const { data, isError, isLoading } = useGetAllCategoriesQuery();

  const category = useMemo(() => {
    return data?.categories.find((category) => category._id === edit.id);
  }, [data, edit]);

  const convertFile = async (e) => {
    const file = await convertToBase64(e.target.files[0]);
    setImage(file);
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const categoryForm = new FormData(e.target);

    await EditCategory({ categoryId: edit.id, category: categoryForm });

    if (result.isError) {
      toast.error(result.error);
      return;
    } else {
      setEdit({ id: null, isEdit: false });
    }
  };

  return (
    <form onSubmit={handleEditCategory} className="space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Edit Category
      </h3>

      <div>
        <div className="w-full h-[200px]">
          {isLoading || isError ? (
            <Skeleton />
          ) : (
            <img
              src={
                image ||
                staticData.SERVER_URL + "/" + category?.image.path
              }
              alt=""
              className="w-full h-full"
            />
          )}
        </div>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload file" />
        </div>
        <FileInput name="image" id="file-upload" onChange={convertFile} />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="category_name"
            className="text-xl"
            value="Category Name"
          />
        </div>
        {isLoading || isError ? (
          <Skeleton height={"35px"} />
        ) : (
          <input
            type="text"
            name="name"
            placeholder={"Enter Category Name"}
            defaultValue={category?.name}
            className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
          />
        )}
      </div>

      <div className="w-full flex items-center justify-center">
        <Button
          disabled={isLoading || isError}
          type="submit"
          className="w-1/3 py-1"
        >
          <span className="text-xl">Edit</span>
        </Button>
      </div>
    </form>
  );
}
