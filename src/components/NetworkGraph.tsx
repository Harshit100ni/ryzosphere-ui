import React, { memo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsNetwork from "highcharts/modules/networkgraph";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { GraphData } from "../query/useGraphData";

HighchartsNetwork(Highcharts);

interface NetworkGraphPoint extends Highcharts.Point {
  relationship?: string;
  name: string;
  id: string;
  labels?: string[];
  type?: string;
  services?: string[];
  aum?: string;
  riskLevel?: string;
  location?: string;
  notes?: string;
}

interface iNetworkGraph {
  graphData?: GraphData;
  isError: boolean;
  isLoading: boolean;
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  selectedProduct: string;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>;
}

const NetworkGraph: React.FC<iNetworkGraph> = (props) => {
  const [chartRef, setChartRef] = useState<Highcharts.Chart | null>(null);
  const [linkLength, setLinkLength] = useState<number>(60);

  const {
    graphData,
    isError,
    isLoading,
    setSelectedState,
    selectedState,
    selectedProduct,
    setSelectedProduct,
  } = props;

  const handleZoomIn = () => {
    const newLinkLength = linkLength * 1.2;
    setLinkLength(newLinkLength);
    if (chartRef) {
      const series = chartRef.series[0] as any;
      if (series.layout) {
        series.layout.options.linkLength = newLinkLength;
        series.layout.start();
      }
    }
  };

  const handleZoomOut = () => {
    const newLinkLength = linkLength * 0.8;
    setLinkLength(newLinkLength);
    if (chartRef) {
      const series = chartRef.series[0] as any;
      if (series.layout) {
        series.layout.options.linkLength = newLinkLength;
        series.layout.start();
      }
    }
  };

  const handleReset = () => {
    const defaultLinkLength = 40;
    setLinkLength(defaultLinkLength);
    if (chartRef) {
      const series = chartRef.series[0] as any;
      if (series.layout) {
        series.layout.options.linkLength = defaultLinkLength;
        series.layout.start();
      }
    }
  };

  const getSeriesData = () => {
    if (!graphData?.links || !Array.isArray(graphData?.links)) {
      return [];
    }
    return graphData.links.map((link: any) => ({
      from: link.source,
      to: link.target,
      // relationship: link.relationship,
    }));
  };

  const getNodesData = () => {
    if (!graphData?.nodes || !Array.isArray(graphData?.nodes)) {
      return [];
    }
    return graphData.nodes.map((node: any) => ({
      id: node.id,
      name: node.name,
      labels: node.labels,
      type: node.type,
      services: node.services,
      aum: node.aum,
      riskLevel: node.riskLevel,
      location: node.location,
      notes: node.notes,
      marker: {
        radius: 12,
        lineWidth: 2,
        lineColor: "#0000FF",
        fillColor: "#FFFFFF",
      },
      color: "#FFFFFF",
      dataLabels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    }));
  };

  const options: Highcharts.Options = {
    accessibility: {
      enabled: true,
      description:
        "Network graph showing relationships between different entities",
    },
    chart: {
      type: "networkgraph",
      height: "100%",
      backgroundColor: "#eaeaea",
      spacing: [20, 20, 20, 20],
      plotBackgroundColor: "#eaeaea",
      margin: [0, 0, 0, 0],
      animation: {
        duration: 1000,
      },
      style: {
        fontFamily: "inherit",
      },
      events: {
        load: function () {
          setChartRef(this);
        },
        render: function () {
          if (this.container.parentElement) {
            this.setSize(
              this.container.parentElement.offsetWidth,
              this.container.parentElement.offsetHeight,
              false
            );
          }
        },
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    plotOptions: {
      networkgraph: {
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9,
          integration: "verlet",
          linkLength: linkLength,
        },
        draggable: true,
      },
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "rgba(255, 255, 255, 0.0)", // Make Highcharts tooltip background fully transparent
      borderWidth: 0,
      shadow: false,
      formatter: function (
        this: Highcharts.TooltipFormatterContextObject
      ): string {
        const point = this.point as NetworkGraphPoint;
        if (point.relationship) {
          return `
            <div class="p-2">
              <div class="font-bold text-lg">${point.relationship}</div>
            </div>
          `;
        }
        return `
          <div class="p-4 max-w-md rounded-xl" style="background-color: rgba(255, 255, 255, 0.6); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)">
            <div class="space-y-3">
              <div class="-m-4 mb-3 p-4 rounded-t-xl" 
                   style="background-color: rgba(239, 246, 255, 0.7);">
                <h3 class="text-xl font-bold text-blue-900">${
                  point.name || "Unnamed Node"
                }</h3>
                <div class="mt-1 text-sm text-blue-700">
                  ${point.type || "No Type/Status"}
                </div>
              </div>
              
              <div class="flex items-start gap-2">
                <div class="text-gray-800 font-medium min-w-[80px]">Labels:</div>
                <div class="text-gray-900">${
                  point.labels
                    ?.map(
                      (label) =>
                        `<span class="inline-block px-2 py-1 mr-1 mb-1 rounded-full text-sm" 
                         style="background-color: rgba(239, 246, 255, 0.7); color: rgb(29, 78, 216);">
                    ${label}
                  </span>`
                    )
                    .join("") || "N/A"
                }</div>
              </div>
              
              <div class="flex items-start gap-2">
                <div class="text-gray-800 font-medium min-w-[80px]">Services:</div>
                <div class="text-gray-900">${
                  point.services
                    ?.map(
                      (service) =>
                        `<span class="inline-block px-2 py-1 mr-1 mb-1 rounded-full text-sm" 
                         style="background-color: rgba(240, 253, 244, 0.7); color: rgb(21, 128, 61);">
                    ${service}
                  </span>`
                    )
                    .join("") || "N/A"
                }</div>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <div class="text-gray-800 font-medium mb-1">AUM</div>
                  <div class="text-gray-900 font-semibold">${
                    point.aum || "N/A"
                  }</div>
                </div>
                
                <div>
                  <div class="text-gray-800 font-medium mb-1">Risk Level</div>
                  <div class="font-semibold ${
                    point.riskLevel?.toLowerCase().includes("high")
                      ? "text-red-700"
                      : point.riskLevel?.toLowerCase().includes("medium")
                      ? "text-yellow-700"
                      : point.riskLevel?.toLowerCase().includes("low")
                      ? "text-green-700"
                      : "text-gray-900"
                  }">${point.riskLevel || "N/A"}</div>
                </div>
              </div>
              
              <div>
                <div class="text-gray-800 font-medium mb-1">Location</div>
                <div class="text-gray-900">${point.location || "N/A"}</div>
              </div>
              
              ${
                point.notes
                  ? `
                <div class="pt-2 mt-2" style="border-top: 1px solid rgba(229, 231, 235, 0.7);">
                  <div class="text-gray-800 font-medium mb-1">Notes</div>
                  <div class="text-gray-900 text-sm">${point.notes}</div>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        `;
      },
    },
    series: [
      {
        type: "networkgraph",
        data: getSeriesData(),
        nodes: getNodesData(),
        dataLabels: {
          enabled: true,
          linkFormat: "{point.relationship}",
          allowOverlap: true,
          style: {
            textOutline: "none",
            fontSize: "12px",
            fontWeight: "bold",
          },
        } as Highcharts.DataLabelsOptions,
        link: {
          color: "#0000FF",
          width: 2,
          dataLabels: {
            enabled: true,
            format: "{point.relationship}",
            allowOverlap: true,
            style: {
              fontSize: "12px",
              textOutline: "none",
              fontWeight: "bold",
            },
          },
        },
      } as any,
    ],
  };

  const stateList = ["CO", "ID", "WA"];
  const productTags = [
    "Grain",
    "Wheat",
    "Rye",
    "Barley",
    "Oats",
    "Triticale",
    "Spelt",
    "Emmer",
    "Einkorn",
    "Heirloom/Landrace Wheat",
    "Heirloom/Landrace Barley",
    "Heirloom/Landrace Rye",
    "Buckwheat",
    "Quinoa",
    "Proso Millet",
    "Pearl Millet",
    "Millets",
    "Sorghum",
    "Sorghum (White)",
    "Sorghum (Red)",
    "Rice",
    "Legumes & Pulses",
    "Chickpeas (Garbanzo - Desi & Kabuli)",
    "Lentils",
    "Peas (all kinds)",
    "Beans (all general beans: great northerns, red, black, etc.)",
    "Black beans",
    "Cranberry beans",
    "Dark red kidney beans",
    "Great northern beans",
    "Green baby lima beans",
    "Light red kidney beans",
    "Pink beans",
    "Pinto beans",
    "Small red beans",
    "Small white beans",
    "Oilseeds & Others",
    "Canola",
    "Soy",
    "Sunflower",
    "Safflower",
    "Flax",
    "Mustard",
    "Rapeseed (not canola variety)",
    "Forage & Fodder Crops",
    "Hay",
    "Hay (Timothy, Alfalfa, Clover, Fescue, Brome, etc.)",
    "Grass",
    "Other Crops",
    "Hemp",
    "Forbes (Kochia)",
    "Wildflowers",
    "Cotton",
    "Potato",
    "Sugar beets",
    "Milo (grain sorghum)",
    "Corn",
    "Vegetables (radish, cabbage, carrots, chicory, onion, coriander)",
    "Fats & Oils",
  ];

  if (isError) {
    return (
      <div className="p-4 w-full">
        <div className="text-red-600 flex items-center gap-2 text-lg">
          <span>Something went wrong. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto bg-[#eaeaea]">
      <div className="flex gap-2 p-4 justify-between">
        <div className="flex gap-4 p-4 ">
          <button
            onClick={handleZoomIn}
            className="flex items-center gap-1 px-1  border-2 border-gray-300 rounded-md hover:bg-gray-100 text-lg"
          >
            <ArrowsPointingInIcon className="w-6 h-6" />
            <span>Zoom In</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="flex items-center gap-1 px-4 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-100 text-lg"
          >
            <ArrowsPointingOutIcon className="w-6 h-6" />
            <span>Zoom Out</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-4 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-100 text-lg"
          >
            <ArrowPathIcon className="w-6 h-6" />
            <span>Reset View</span>
          </button>
        </div>
        <div className="flex gap-4 p-4">
          {/* State Selection */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="All">All</option>
              {stateList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Product Selection */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Select Product
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="All">All</option>
              {productTags.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-full max-h-[60vh] bg-[#eaeaea] overflow-hidden relative">
        {isLoading ? (
          <div className="p-4 flex items-center justify-center w-full h-full">
            <div className="animate-spin h-6 w-6 border-3 border-blue-500 rounded-full border-t-transparent"></div>
            <span className="ml-2 text-lg">Loading graph data...</span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#eaeaea]">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{
                className: "w-full h-full bg-[#eaeaea] p-4",
              }}
            />
          </div>
        )}
        {/* */}
      </div>
    </div>
  );
};

export default memo(NetworkGraph);
