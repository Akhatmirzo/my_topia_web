import React, { useEffect, useMemo, useState } from "react";
import { Datepicker, Label, Select } from "flowbite-react";
import { Bar } from "react-chartjs-2";
import { chart as chartjs } from "chart.js/auto";
import {
  useGetStatisticsQuery,
  useUpdateStatisticsMutation,
} from "../../store/api/statisticsApi";

export default function Dashboard() {
  const [date, setDate] = useState("");
  const [dateType, setDateType] = useState("day");
  const { data } = useGetStatisticsQuery({ dateType, date });
  const [updateStatistics] = useUpdateStatisticsMutation();

  const state = useMemo(() => {
    console.log(data);

    if (data?.statistics.length > 0) {
      const labels = data?.statistics.map((data) => data._id + " AM");
      const Revenue = data?.statistics.map((data) => data.totalRevenue);

      console.log(data);
      return {
        labels,
        datasets: [
          {
            label: "Total Revenue",
            data: Revenue,
          },
        ],
      };
    } else {
      return {
        labels: [],
        datasets: [
          {
            label: "Statistics",
            data: [],
          },
        ],
      };
    }
  }, [data]);

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

    setDate(dateString);
  }

  useEffect(() => {
    updateStatistics({ dateType, date });
  }, [date, dateType, updateStatistics]);

  return (
    <div>
      <div className="relative flex flex-col">
        <div className="absolute top-0 right-5 flex items-center gap-2">
          {dateType === "day" && (
            <Datepicker
              className="w-[300px]"
              onSelectedDateChanged={(e) => getDate(e)}
            />
          )}
          <div className="w-[100px]">
            <Select
              id="countries"
              required
              defaultValue={"day"}
              onChange={(e) => {
                setDate("");
                setDateType(e.target.value);
              }}
            >
              <option value={"day"}>Day</option>
              <option value={"month"}>Month</option>
              <option value={"year"}>Year</option>
            </Select>
          </div>
        </div>
        <div className="w-full h-full">
          <Bar data={state} />
        </div>
      </div>
    </div>
  );
}
