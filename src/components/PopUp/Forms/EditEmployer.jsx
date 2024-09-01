import React, { useMemo } from "react";
import { Button, Label } from "flowbite-react";
import PopUpInput from "../PopUpInput";
import {
  useGetEmployersQuery,
  useUpdateEmployerMutation,
} from "../../../store/api/employersApi";
import { useForm } from "react-hook-form";

export default function EditEmployer({ edit, setEdit }) {
  const [edit_employer, editResult] = useUpdateEmployerMutation();
  const { data, isLoading, isError } = useGetEmployersQuery();
  const { register, handleSubmit, reset } = useForm();

  const editEmployerData = useMemo(() => {
    if (edit.id) {
      const employer = data?.employers.find(
        (employer) => employer._id === edit.id
      );
      return employer;
    } else return;
  }, [data, edit.id]);

  const handleEditEmployer = async (data) => {
    const { phoneNumber, fullname, password } = data || {};

    if (edit.id) {
      let edit_data = {};

      if (phoneNumber) edit_data.phoneNumber = phoneNumber;
      if (fullname) edit_data.fullname = fullname;
      if (password) edit_data.password = password;

      await edit_employer({
        id: edit.id,
        employer: edit_data,
      });

      if (editResult.isError) {
        console.error(editResult.error);
        return;
      } else {
        reset();
        setEdit({ isEdit: false, id: null });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEditEmployer)} className="space-y-6">
      <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
        Edit Employer
      </h3>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="phoneNumber"
            className="text-2xl"
            value="Employer Phone number"
          />
        </div>
        <PopUpInput
          fn={register("phoneNumber")}
          placeholder={"Enter employer Phone Number"}
          value={editEmployerData?.phoneNumber}
          type={"tel"}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="fullname"
            className="text-2xl"
            value="Employer name"
          />
        </div>
        <PopUpInput
          fn={register("fullname")}
          placeholder={"Enter employer name"}
          value={editEmployerData?.fullname}
          type={"text"}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            className="text-2xl"
            value="Employer password"
          />
        </div>
        <PopUpInput
          fn={register("password")}
          placeholder={"Enter password"}
          type={"password"}
        />
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
