import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SingleVerticalBarChart = () => {
  const data = [
    { name: "Organizations", value: 10, color: "#F4C242" },
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
      //   width: , // Adjust width for labels
      backgroundColor: "transparent",
    },
    title: { text: "" },
    xAxis: {
      categories: [""],
      labels: { enabled: false },
      lineWidth: 0, // Hides the bottom line
    },
    yAxis: {
      min: 0,
      max: yAxisMax,
      visible: false,
      gridLineWidth: 0, // Removes grid lines if present
    },
    credits: { enabled: false }, // Removes Highcharts watermark
    plotOptions: {
      series: {
        stacking: "normal",
        pointWidth: 20, // Ensures no spaces between segments
        groupPadding: 0,
        borderWidth: 0, // Removes any border between stacks
        dataLabels: {
          enabled: true,
          useHTML: true,
          inside: false,
          align: "right",
          verticalAlign: "middle",
          style: { color: "#000", fontSize: "12px", fontWeight: "bold" }, // Ensures all text is black
          formatter: function (this: Highcharts.PointLabelObject): string {
            return `<div style="text-align: right;margin-top:40%; font-size: 12px; font-weight: bold; color: #000;">
                      ${this.y} <span>${this.series.name}</span>
                    </div>`;
          },
        },
        states: { inactive: { opacity: 1 } },
      },
      column: {
        borderRadius: 0, // No gaps or padding between bars by default
      },
    },
    legend: { enabled: false },
    tooltip: { enabled: true },
    series: data.map((item, index) => ({
      name: item.name,
      data: [item.value],
      color: item.color,
      borderRadius:
        index === 0
          ? 10 // Top rounded for first bar
          : index === data.length - 1
          ? 10 // Bottom rounded for last bar
          : 0,
    })),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SingleVerticalBarChart;
