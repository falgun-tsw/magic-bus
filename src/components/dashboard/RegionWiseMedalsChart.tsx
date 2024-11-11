import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RegionWiseMedalsChart = () => {
  // Sample data
  const options = {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "Region wise medals",
      align: "left",
    },
    xAxis: {
      categories: ["North", "South", "East", "West"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
    },
    series: [
      {
        name: "Platinum",
        data: [30, 50, 78, 62],
        color: "#7C4DFF", // Color for Platinum
      },
      {
        name: "Gold",
        data: [50, 60, 62, 78],
        color: "#FFB300", // Color for Gold
      },
      {
        name: "Silver",
        data: [60, 50, 50, 62],
        color: "#BDBDBD", // Color for Silver
      },
      {
        name: "Bronze",
        data: [70, 80, 40, 50],
        color: "#FF8A65", // Color for Bronze
      },
    ],
  };

  return (
    <div style={{width:"100%", margin: "0 auto", border:"1px solid gray", marginBottom:"30px"}}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RegionWiseMedalsChart;
