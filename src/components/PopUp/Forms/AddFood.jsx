import { Button, FileInput, Label, Select } from "flowbite-react";
import React, { useState } from "react";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { useGetAllCategoriesQuery } from "../../../store/api/categoriesApi";
import { IoMdClose } from "react-icons/io";
import { uid } from "uid";

export default function AddFood({ AddFoodFn }) {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [characterCount, setCharacterCount] = useState([]);
  const [additionCount, setAdditionCount] = useState([]);
  const [optionsCount, setOptionsCount] = useState([]);
  const [type, setType] = useState(false);

  const [image, setImage] = useState();

  const convertFile = async (e) => {
    if (e.target.files.length > 0) {
      const file = await convertToBase64(e.target.files[0]);
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter tugmasini bosishda formaning yuborilishini to'xtatadi
      console.log("Enter tugmasi bosildi, lekin forma yuborilmadi");
    }
  };

  const removeCharacter = (id) => {
    setCharacterCount((prev) => prev.filter((item) => item !== id));
  };
  const removeAddition = (id) => {
    setAdditionCount((prev) => prev.filter((item) => item !== id));
  };
  const removeOptions = (id) => {
    setOptionsCount((prev) => prev.filter((item) => item !== id));
  };

  const AddFood = async (e) => {
    e.preventDefault();
    const foodForm = new FormData(e.target);

    for (let pair of foodForm.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    await AddFoodFn(foodForm);
  };

  return (
    <form onSubmit={AddFood} className="space-y-6 w-full">
      <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
        Add Food
      </h3>

      <div className="w-full flex gap-5">
        <div className="w-full">
          <div>
            <div className="w-full h-[200px]">
              <img src={image} alt="" className="w-full h-full" />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Upload file" />
            </div>
            <FileInput
              name="image"
              id="file-upload"
              onChange={convertFile}
              required
              accept="image/*"
            />
          </div>

          <div className="mt-3">
            <div className="mb-2 block">
              <Label
                htmlFor="food_name"
                className="text-2xl"
                value="Food Name"
              />
            </div>
            <input
              type="text"
              name="name"
              placeholder={"Enter Food Name"}
              required
              className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
            />
          </div>
          <div className="mt-3">
            <div className="mb-2 block">
              <Label htmlFor="type" className="text-2xl" value="Select Type" />
            </div>
            <Select
              id="type"
              required
              onChange={(e) =>
                e.target.value === "Options" ? setType(true) : setType(false)
              }
              className=" [&_select]:rounded-none font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
            >
              <option>Price</option>
              <option>Options</option>
            </Select>
          </div>
          {type ? (
            <div className="flex flex-col gap-2">
              {optionsCount.map((option, index) => (
                <div className="flex relative">
                  <input
                    type="text"
                    placeholder={"option name"}
                    name={`options[${index}][name]`}
                    onKeyDown={handleKeyDown}
                    required
                    className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
                  />
                  <input
                    type="number"
                    placeholder={"option price"}
                    name={`options[${index}][price]`}
                    onKeyDown={handleKeyDown}
                    required
                    className="no-spinner w-2/5 h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 out outline-gray-400 focus:ring-gray-400"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={() => removeOptions(option)}
                  >
                    <IoMdClose color="#fff" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-2 py-1 bg-white text-black rounded-b-md"
                style={{ border: "1px solid white" }}
                onClick={() => setOptionsCount([...optionsCount, uid()])}
              >
                add
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <div className="mb-2 block"></div>
              <input
                type="text"
                name="price"
                placeholder={"Price"}
                required
                className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
              />
            </div>
          )}
        </div>

        <div className="w-full">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="category_id"
                className="text-2xl"
                value="Category"
              />
            </div>
            <select
              name="category_id"
              id="category_id"
              style={{ border: "1px solid white" }}
              required
            >
              <option value="">Select Category</option>
              {!isLoading && !isError
                ? data?.categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          <div className="mt-5">
            <div className="mb-2 block">
              <Label
                htmlFor="characteristics"
                className="text-2xl"
                value="Characteristics"
              />
            </div>
            <div className="flex flex-col">
              {characterCount.map((character, index) => (
                <div key={character} className="relative">
                  <input
                    type="text"
                    placeholder={`Characteristic ${index + 1}`}
                    name="characteristics[]"
                    onKeyDown={handleKeyDown}
                    required
                    className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
                  />

                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={() => removeCharacter(character)}
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-2 py-1 bg-white text-black rounded-r-md"
                onClick={() => setCharacterCount([...characterCount, uid()])}
                style={{ border: "1px solid white" }}
              >
                add
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="addition" className="text-2xl" value="Addition" />
            </div>
            <div className="flex flex-col gap-2">
              {additionCount.map((addition, index) => (
                <div className="flex relative">
                  <input
                    type="text"
                    placeholder={"addition name"}
                    name={`addition[${index}][name]`}
                    onKeyDown={handleKeyDown}
                    required
                    className="w-full h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400"
                  />
                  <input
                    type="number"
                    placeholder={"addition price"}
                    name={`addition[${index}][price]`}
                    onKeyDown={handleKeyDown}
                    required
                    className="no-spinner w-2/5 h-[35px] text-xl text-white font-mono bg-transparent outline outline-1 out outline-gray-400 focus:ring-gray-400"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={() => removeAddition(addition)}
                  >
                    <IoMdClose color="#fff" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-2 py-1 bg-white text-black rounded-b-md"
                style={{ border: "1px solid white" }}
                onClick={() => setAdditionCount([...additionCount, uid()])}
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <Button type="submit" className="w-1/3 py-1">
          <span className="text-xl">Add</span>
        </Button>
      </div>
    </form>
  );
}
