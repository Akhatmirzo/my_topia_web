import { Button } from "flowbite-react";
import React, { useState } from "react";
import { PopUp } from "../components/PopUp/PopUp";
import AddFood from "../components/PopUp/Forms/AddFood";
import {
  useCreateFoodMutation,
  useDeleteFoodMutation,
  useGetFoodsQuery,
} from "../store/api/foodsApi";
import { toast } from "react-toastify";
import Loading from "../components/Loadings/Loading";
import AdminFoodCard from "../components/AdminFoodCard";

export default function Foods() {
  const [openModal, setOpenModal] = useState(false);
  const { data, isError, isLoading } = useGetFoodsQuery({ category_id: "" });
  const [createFoods] = useCreateFoodMutation();
  const [deleteFood] = useDeleteFoodMutation();

  const handleCreateFood = async (food) => {
    try {
      const response = await createFoods(food);
      if (response.data.success) {
        toast.success("Food created successfully");
        setOpenModal(false);
      } else {
        toast.error("Failed to create food");
        throw new Error("Failed to create food");
      }
    } catch (error) {
      toast.error(`Error creating food: ${error.message}`);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const response = await deleteFood({ id });
      if (response.data.success) {
        toast.success("Food Delete successfully");
        setOpenModal(false);
      } else {
        toast.error("Failed to Delete food");
        throw new Error("Failed to Delete food");
      }
    } catch (error) {
      toast.error(`Error delete food: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <h1 className="dark:text-white text-3xl">Foods</h1>

        <Button onClick={() => setOpenModal(true)}>
          <span className="text-lg">Add Food</span>
        </Button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {isError ? (
          <h1 className="text-center text-red-600">Foods Not Found</h1>
        ) : (
          data?.products.map((food) => (
            <AdminFoodCard key={food._id} food={food} deleted={handleDeleteFood} />
          ))
        )}
      </div>

      <PopUp size="7xl" openModal={openModal} setOpenModal={setOpenModal}>
        {/* Add your modal content here */}
        <AddFood AddFoodFn={handleCreateFood} />
      </PopUp>

      {isLoading && <Loading />}
    </div>
  );
}
