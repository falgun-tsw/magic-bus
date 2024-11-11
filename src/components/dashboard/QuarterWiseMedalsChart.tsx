import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const QuarterWiseMedalsChart = () => {
  // Sample data
  const options = {
    chart: {
      type: "line",
      backgroundColor: "white",
    },
    title: {
      text: "Quarter wise medals",
      align: "left",
    },
    xAxis: {
      categories: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
    },
    yAxis: {
      title: {
        text: "",
      },
      min: 0,
      max: 100,
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: "Platinum",
        data: [30, 50, 70, 80],
        color: "#7C4DFF", // Color for Platinum
      },
      {
        name: "Gold",
        data: [50, 60, 80, 90],
        color: "#FFB300", // Color for Gold
      },
      {
        name: "Silver",
        data: [60, 50, 40, 60],
        color: "#BDBDBD", // Color for Silver
      },
      {
        name: "Bronze",
        data: [70, 60, 50, 40],
        color: "#FF8A65", // Color for Bronze
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        border: "1px solid gray",
        marginBottom: "20px",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default QuarterWiseMedalsChart;
