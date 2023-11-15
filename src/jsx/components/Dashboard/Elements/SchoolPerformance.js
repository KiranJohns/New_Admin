import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import fetchData from "../../../../axios";

const SchoolPerformance = () => {
  const [series1, setSeries1] = useState([]);
  const [series2, setSeries2] = useState([]);
  const makeRequest = fetchData();
  const [series, setSeries] = useState([
    {
      name: "series1",
      data: series1,
    },
    {
      name: "series2",
      data: series2,
    },
  ]);
  useEffect(() => {
    let today = new Date();
    let before6days = new Date();
    before6days.setDate(new Date().getDate() - 6);
    before6days = before6days.toLocaleDateString();

    let before12days = new Date();
    before12days.setDate(new Date().getDate() - 12);
    before12days = before12days.toLocaleDateString();


    makeRequest("GET", "/info/super-admin-dashboard-data")
      .then((res) => {
        const course = res.data.response.purchasedCourse || [];

        // console.log(course);

        let flag = false;
        let total = 0;
        let arr1 = [0, 0, 0, 0, 0, 0];
        let arr2 = [0, 0, 0, 0, 0, 0];
        console.log(today.toLocaleDateString());
        let j = 0;
        for (let i = 0; i < course?.length; i++) {
          let date = new Date(course[i].date);
          if (date.toLocaleDateString() == today.toLocaleDateString()) {
            total += Number(course[i].amount);
            console.log(date.toLocaleDateString(), course[i].amount);
          } else {
            if (flag) {
              arr1[j] = total;
              ++j
            } else {
              arr2[j] = total;
              ++j
            }

            total = Number(course[i].amount);

            if (today.toLocaleDateString() == before12days) break;

            // console.log(today.toLocaleDateString());

            today.setDate(today.getDate() - 1);

            if (today.toLocaleDateString() == before6days) {
              j = 0;
              flag = true;
            }
          }
        }
        arr1.reverse()
        arr2.reverse()
        setSeries(prev => {
          return [
            ...prev,
            prev[0].data = arr2,
            prev[1].data = arr1
          ]
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const  series = ;
  const options = {
    chart: {
      type: "area",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["var(--rgba-primary-1)", "#f5a792"],
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["var(--primary)", "var(--secondary)"],
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      strokeDashArray: 6,
      borderColor: "#dadada",
    },
    yaxis: {
      labels: {
        style: {
          colors: "#B5B5C3",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 400,
        },
        formatter: function (value) {
          if(value >= 1000) {
            return value / 1000 + "K";
          } else {
            return value + "";
          }
        },
      },
    },

    xaxis: {
      categories: [
        "Week 01",
        "Week 02",
        "Week 03",
        "Week 04",
        "Week 05",
        "Week 06",
      ],
      labels: {
        style: {
          colors: "#B5B5C3",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 400,
        },
      },
    },
    fill: {
      type: "solid",
      opacity: 0.05,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <div id="marketChart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={280}
      />
    </div>
  );
};
export default SchoolPerformance;
