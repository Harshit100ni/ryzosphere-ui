import { useQuery } from "react-query";
import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

interface Node {
  id: string;
  name: string;
  labels: string[];
  type: string;
  services: string[];
  aum: string;
  riskLevel: string;
  location: string;
  notes: string;
}

interface Link {
  source: string;
  target: string;
  relationship: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

const fetchGraphData = async (
  selectedState?: string,
  selectedProduct?: string,
  selectType?: string,
  selectedSubType?: string
): Promise<GraphData> => {
  const response = await axiosConfig.get<GraphData>(
    API_ENDPOINTS.GET_KWL_GRAPH_DATA,
    {
      params: {
        state: selectedState || "All",
        product: selectedProduct || "All",
        type: selectType || "All",
        subType: selectedSubType || "All",
      },
    }
  );

  return response.data;
};

const useGraphData = (
  selectedState: string,
  selectedProduct: string,
  selectType: string,
  selectedSubType: string
) => {
  return useQuery<GraphData, Error>(
    ["graphData", selectedState, selectedProduct, selectType, selectedSubType],
    () =>
      fetchGraphData(
        selectedState,
        selectedProduct,
        selectType,
        selectedSubType
      )
  );
};

export default useGraphData;
