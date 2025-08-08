import { legendData } from "../utils/legendData";
import { useGetNodeCount } from "../query/useNodeCount";
import { FunctionComponent } from "react";

const LegendBar: FunctionComponent = () => {
  const { data } = useGetNodeCount();

  console.log("data", data);

  const filteredData = legendData.map((legend, index) => {
    const nodeData = data?.find((item: any) => item.label === legend.label);
    return { ...legend, value: nodeData ? nodeData.count : 0 };
  });
  console.log("filteredData", filteredData);
  return (
    <div className="h-full w-full bg-white flex flex-row-reverse items-center gap-4 text-base text-andsimpleco-black font-jetbrains-mono">
      {/* Color Bars */}
      <div className="flex flex-col h-full justify-between">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className={`w-5 h-full ${
              index === 0
                ? "rounded-t-[10px]"
                : index === filteredData.length - 1
                ? "rounded-b-[10px]"
                : ""
            }`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>

      {/* Labels & Values */}
      <div className="flex w-full flex-col h-full justify-evenly pl-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="flex w-full items-center flex-col justify-center gap-0"
          >
            <div className="w-full text-end">
              <span className="font-medium w-6 text-right">{item.value}</span>
            </div>
            <div className="w-full text-end">
              <span className="text-smi font-ibm-plex-sans whitespace-pre">
                {item.label.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendBar;
