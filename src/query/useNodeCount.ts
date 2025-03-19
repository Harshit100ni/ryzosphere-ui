import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";
import { useQuery } from "react-query";

const fetchNodeCount = async () => {
  const resp = await axiosConfig.get(API_ENDPOINTS.GET_NODE_COUNT);
  return resp.data.data;
};

export const useGetNodeCount = () => {
  return useQuery(["get-node-count"], fetchNodeCount);
};
