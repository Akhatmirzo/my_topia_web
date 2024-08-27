import { Button, FileInput, Label } from "flowbite-react";
import React, { useState } from "react";
import { convertToBase64 } from "../../../utils/convertToBase64";

export default function AddCategory({ AddCategoryFn }) {
  const [image, setImage] = useState();

  const convertFile = async (e) => {
    const file = await convertToBase64(e.target.files[0]);
    setImage(file);
  };

  const AddCategory = async (e) => {
    e.preventDefault();
    const categoryForm = new FormData(e.target);
    await AddCategoryFn(categoryForm);
  };

  return (
    <form onSubmit={AddCategory} className="space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Add Category
      </h3>

      <div>
        <div className="w-full h-[200px]">
          <img src={image} alt="" className="w-full h-full" />
        </div>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload file" />
        </div>
        <FileInput name="image" accept="image/*" id="file-upload" onChange={convertFile} required />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="category_name"
            className="text-xl"
            value="Category Name"
          />
        </div>
        <input
          type="text"
          name="name"
          placeholder={"Enter Category Name"}
          required
          className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <Button type="submit" className="w-1/3 py-1">
          <span className="text-xl">Add</span>
        </Button>
      </div>
    </form>
  );
}
