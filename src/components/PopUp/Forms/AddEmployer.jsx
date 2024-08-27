import { Button, Label } from "flowbite-react";
import React from "react";
import PopUpInput from "../PopUpInput";
import { useForm } from "react-hook-form";

export default function AddEmployer({ AddEmployerFn }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await AddEmployerFn(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Add Employer
      </h3>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="employer_name"
            className="text-xl"
            value="Employer fullName"
          />
        </div>
        <PopUpInput
          type="text"
          placeholder={"Enter Employer Name"}
          required={true}
          fn={register("fullname")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="employer_phone"
            className="text-xl"
            value="Employer Phone Number"
          />
        </div>
        <PopUpInput
          type="text"
          placeholder={"Enter Employer Phone"}
          required={true}
          fn={register("phoneNumber")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="employer_password"
            className="text-xl"
            value="Employer password"
          />
        </div>
        <PopUpInput
          type="text"
          placeholder={"Enter Employer Password"}
          required={true}
          fn={register("password")}
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <Button
          //   disabled={isLoading || isError}
          type="submit"
          className="w-1/3 py-1"
        >
          <span className="text-lg">Add Employer</span>
        </Button>
      </div>
    </form>
  );
}
