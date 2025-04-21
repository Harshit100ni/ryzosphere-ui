// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const SingleVerticalBarChart = () => {
//   const data = [
//     { name: "Organizations", value: 10, color: "#F4C242" },
//     { name: "Organization Type", value: 13, color: "#E59866" },
//     { name: "Organization Sub Type", value: 10, color: "#5DA964" },
//     { name: "Product Tags", value: 8, color: "#2E86C1" },
//     { name: "State", value: 6, color: "#1B365D" },
//     { name: "Certificate", value: 10, color: "#4A4A4A" },
//   ];

//   const yAxisMax = data.reduce((sum, item) => sum + item.value, 0);

//   const options = {
//     chart: {
//       type: "column",
//       height: 800,
//       width: 250,
//       backgroundColor: "transparent",
//       spacingRight: 0, // Ensures it aligns to the right
//     },
//     title: { text: "" },
//     xAxis: {
//       categories: [""],
//       labels: { enabled: true },
//       lineWidth: 0,
//       offset: 0, // Moves graph to the right edge
//     },
//     yAxis: {
//       min: 0,
//       max: yAxisMax,
//       visible: false,
//       gridLineWidth: 0,
//     },
//     credits: { enabled: false },
//     plotOptions: {
//       series: {
//         stacking: "normal",
//         pointWidth: 20,
//         groupPadding: 0,
//         borderWidth: 0,
//         dataLabels: {
//           enabled: true,
//           useHTML: true,
//           inside: false,
//           align: "right", // Ensures text is readable
//           verticalAlign: "middle",
//           y: 50,
//           x: -10, // Adjust this for correct text alignment
//           style: { color: "#000", fontSize: "12px", fontWeight: "bold" },
//           formatter: function (this: Highcharts.PointLabelObject): string {
//             return `
//               <div style="text-align: right; white-space: normal; display: block;">
//                 <div style="font-size: 16px; font-weight: bold;">${this.y}</div>
//                 <div style="font-size: 16px;">${this.series.name}</div>
//               </div>`;
//           },
//         },
//         states: { inactive: { opacity: 1 } },
//       },
//       column: {
//         borderRadius: 0,
//       },
//     },
//     legend: { enabled: true },
//     tooltip: { enabled: true },
//     series: data.map((item, index) => ({
//       name: item.name,
//       data: [item.value],
//       color: item.color,
//       borderRadius: index === 0 || index === data.length - 1 ? 10 : 0,
//     })),
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default SingleVerticalBarChart;

import Highcharts, { offset } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SingleVerticalBarChart = () => {
  const data = [
    { name: "Organizations", value: 18, color: "#F4C242" },
    { name: "Organization Type", value: 13, color: "#E59866" },
    { name: "Organization Sub Type", value: 10, color: "#5DA964" },
    { name: "Product Tags", value: 8, color: "#2E86C1" },
    { name: "State", value: 6, color: "#1B365D" },
    { name: "Certificate", value: 10, color: "#4A4A4A" },
  ];

  const yAxisMax = data.reduce((sum, item) => sum + item.value, 0);

  const options = {
    chart: {
      type: "column",
      height: 800,
      width: 250,
      backgroundColor: "transparent",
      spacingRight: -170, // Adjust for alignment
      spacingLeft: 20,
    },
    title: { text: "" },
    xAxis: {
      categories: [""],
      labels: { enabled: false },
      lineWidth: 0,
      offset: 0,
    },
    yAxis: {
      min: 0,
      max: yAxisMax,
      visible: false,
      gridLineWidth: 0,
      offset: 0,
    },
    credits: { enabled: false },
    plotOptions: {
      series: {
        stacking: "normal",
        pointWidth: 20,
        groupPadding: 0,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          useHTML: true,
          inside: false,
          align: "right",
          verticalAlign: "top",
          y: 30, // Keep text centered
          x: -50, // Move text 5px closer to graph
          style: { color: "#000", fontSize: "12px", fontWeight: "bold" },
          formatter: function (this: Highcharts.PointLabelObject): string {
            return `
              <div style="text-align: right; white-space: nowrap;">
                <div style="font-size: 14px; font-weight: bold;">${this.y}</div>
                <div style="font-size: 14px;">${this.series.name}</div>
              </div>`;
          },
        },
        states: { inactive: { opacity: 1 } },
      },
      column: {
        borderRadius: 0,
      },
    },
    legend: {
      enabled: false,
      // layout: "vertical", // Stack items in one column
      // align: "right",
      // verticalAlign: "middle",
      // itemMarginBottom: 5, // Adjusts spacing between legend items
    },
    tooltip: { enabled: true },
    series: data.map((item, index) => ({
      name: item.name,
      data: [item.value],
      color: item.color,
      borderRadius: index === 0 || index === data.length - 1 ? 10 : 0,
    })),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SingleVerticalBarChart;
