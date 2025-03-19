import React, { memo, useEffect, useRef, useState } from "react";
import Header from "../components/header";
import NetworkGraph from "../components/NetworkGraph";
import NodeRelationshipManager from "../components/NodeRelationshipManager";
import useGraphData from "../query/useGraphData";
import N8NChatBot from "../components/N8NChatBot";
import { resetImage } from "../assets";

const RyzosphereGraph: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [selectType, setSelectType] = useState<string>("All");
  const [selectedSubType, setSelectedSubType] = useState<string>("All");
  const {
    data: graphData,
    isError,
    isLoading,
    refetch,
  } = useGraphData(selectedState, selectedProduct, selectType, selectedSubType);
  useEffect(() => {
    if (selectedState || selectedProduct || selectType || selectedSubType) {
      refetch();
    }
  }, [selectedState, selectedProduct, selectType, selectedSubType, refetch]);

  return (
    <>
      <NodeRelationshipManager {...{ isOpenModal, setIsOpenModal, refetch }} />

      <div className="min-h-screen bg-[#background: var(--color-white-solid, #FFFFFF)]">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-full mx-20 py-8 h-full">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <h1 className="text-[32px] text-[#000000] font-normal font-['IBM Plex Sans']">
                Ryzosphere Network
              </h1>
              <span className="tect-[#36343B] text-base">
                Like the soil, a thriving regenerative supply chain network
              </span>
            </div>
            <button
              onClick={() => setIsOpenModal(true)}
              className="text-[#1D4A72] text-lg border border-[#1D4A72] py-2 px-6 rounded-xl"
            >
              <div className="flex gap-3">
                <img
                  className="w-[18px] relative max-h-full object-contain"
                  alt=""
                  src={resetImage}
                />
                Update Graph
              </div>
            </button>
          </div>

          {/* Network Graph */}
          <div className="grid grid-cols-12 h-[90vh] min-h-[600px]">
            <div className="col-span-4">
              <N8NChatBot />
            </div>

            <NetworkGraph
              {...{
                graphData,
                isError,
                isLoading,
                setSelectedState,
                selectedState,
                selectedProduct,
                setSelectedProduct,
                selectType,
                setSelectType,
                selectedSubType,
                setSelectedSubType,
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default memo(RyzosphereGraph);
