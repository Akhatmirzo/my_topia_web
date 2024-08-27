import React, { useEffect, useRef, useState } from "react";
import { Datepicker } from "flowbite-react";
import { Bar } from "react-chartjs-2";
import { chart as chartjs } from "chart.js/auto";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [state, setState] = useState({
    labels: userData.map((user) => user.year),
    datasets: [
      {
        label: "UserGained",
        data: userData.map((user) => user.userGain),
      },
    ],
  });

  function getDate(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const dateString = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }T${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${
      second < 10 ? `0${second}` : second
    }`;

    console.log(dateString, "Date");
  }

  return (
    <div>
      <div className="relative flex flex-col">
        <Datepicker
          className="w-[300px] absolute top-0 right-5"
          onSelectedDateChanged={(e) => getDate(e)}
        />
        <Bar data={state} />
      </div>
    </div>
  );
}
