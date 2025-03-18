import React, { memo, useEffect, useRef, useState } from "react";
import Header from "../components/header";
import ChatBot from "../components/ChatBot";
import NetworkGraph from "../components/NetworkGraph";
import NodeRelationshipManager from "../components/NodeRelationshipManager";
import useGraphData from "../query/useGraphData";
import N8NChatBot from "../components/N8NChatBot";

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
        <main className="max-w-full mx-40 py-8 h-full">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-[32px] text-[#1D4A72] font-normal font-['IBM Plex Sans']">
              Ryzosphere Network Analysis
            </h1>
            <button
              onClick={() => setIsOpenModal(true)}
              className="text-[#1D4A72] text-lg border border-black py-2 px-6 rounded-full"
            >
              Update Graph
            </button>
          </div>

          {/* Network Graph */}
          <div className="flex h-[70vh] min-h-[600px]">
            {/* <ChatBot /> */}
            <N8NChatBot />
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
