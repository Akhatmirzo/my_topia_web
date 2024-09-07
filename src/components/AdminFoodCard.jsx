import React from "react";
import staticData from "../store/staticData";
import { Button, Card} from "flowbite-react";

export default function AdminFoodCard({ food, deleted, updated }) {
  const { _id, name, price, characteristics, addition, images, options } =
    food || {};

  return (
    <Card
      id="adminCard"
      className="max-w-sm w-full rounded overflow-hidden shadow-lg bg-white"
    >
      <img src={staticData.SERVER_URL + "/" + images[0]?.path} alt="" />

      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            {name}
          </h2>
        </div>

        {price && (
          <div className="mb-4">
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              Price:{" "}
            </span>
            <span className="text-3xl text-green-500">{price} so'm</span>
          </div>
        )}

        {options && (
          <div className="flex items-center flex-wrap gap-10 mysm:gap-2">
            {options?.map((option, index) => (
              <ul key={index} className="flex items-center gap-2">
                <li className="dark:text-white text-black">{option.name}: {option.price}</li>
              </ul>
            ))}
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Characteristics:
          </h3>
          <ul className="list-disc pl-5 mt-2 h-[130px] overflow-x-hidden overflow-y-auto text-gray-600">
            {characteristics.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Addition:
          </h3>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            {addition.map((item, index) => (
              <li key={index}>
                {item.name}: {item.price}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Button
            onClick={() => deleted(_id)}
            size={"xl"}
            color={"red"}
            className="text-xl"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
