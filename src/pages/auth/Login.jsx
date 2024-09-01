import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../store/api/authApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loadings/Loading";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [login, result] = useLoginMutation();

  const submitForm = async (data) => {
    // Your login logic goes here
    await login({
      role: data.role,
      auth: { phoneNumber: data.phoneNumber, password: data.password },
    });

    if (result.isError) return;

    reset();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      navigate("/" + role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (result.isLoading) return <Loading />;

  return (
    <div className="bg-yellow-400 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:w-6/12 w-10/12 shadow-3xl">
        <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="32" height="32" fill="#FFF" viewBox="0 0 24 24">
            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
          </svg>
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="p-12 md:p-24">
          <div className="text-xl mb-6 md:mb-8">
            <label
              htmlFor="role"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400"
            >
              Select an option
            </label>
            <select
              id="role"
              defaultValue={"employer"}
              {...register("role")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="employer">Employer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-gray-200 pl-14 py-2 md:py-4 focus:outline-none w-full"
              placeholder="PhoneNumber"
              {...register("phoneNumber")}
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              type="password"
              id="password"
              className="bg-gray-200 pl-14 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
