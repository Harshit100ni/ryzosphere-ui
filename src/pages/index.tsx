import React, { memo, useEffect, useState } from "react";
import Header from "../components/header";
import ChatBot from "../components/ChatBot";
import NetworkGraph from "../components/NetworkGraph";
import NodeRelationshipManager from "../components/NodeRelationshipManager";
import useGraphData from "../query/useGraphData";

const RyzosphereGraph: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const {
    data: graphData,
    isError,
    isLoading,
    refetch,
  } = useGraphData(selectedState, selectedProduct);
  useEffect(() => {
    if (selectedState || selectedProduct) {
      refetch();
    }
  }, [selectedState, selectedProduct, refetch]);

  return (
    <>
      <NodeRelationshipManager {...{ isOpenModal, setIsOpenModal, refetch }} />

      <div className="min-h-screen bg-[#faf7f5]">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-[1380px] mx-auto py-8 h-full">
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
            <ChatBot />
            <NetworkGraph
              {...{
                graphData,
                isError,
                isLoading,
                setSelectedState,
                selectedState,
                selectedProduct,
                setSelectedProduct,
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default memo(RyzosphereGraph);
