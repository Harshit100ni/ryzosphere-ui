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

const fetchGraphData = async (): Promise<GraphData> => {
  const response = await axiosConfig.get<GraphData>(
    API_ENDPOINTS.GET_KWL_GRAPH_DATA
  );

  return response.data;
};

const useGraphData = () => {
  return useQuery<GraphData, Error>(["graphData"], fetchGraphData);
};

export default useGraphData;
