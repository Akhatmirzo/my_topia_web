import { Button, Label } from "flowbite-react";
import React from "react";
import PopUpInput from "../PopUpInput";
import { useForm } from "react-hook-form";

export default function AddTable({ addTableFn }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await addTableFn(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
        Add Table
      </h3>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="table_number"
            className="text-2xl"
            value="Employer fullName"
          />
        </div>
        <PopUpInput
          type="number"
          placeholder={"Enter Table Number"}
          required={true}
          fn={register("table_number")}
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <Button
          //   disabled={isLoading || isError}
          type="submit"
          className="w-1/3 py-1"
        >
          <span className="text-xl">Add</span>
        </Button>
      </div>
    </form>
  );
}
