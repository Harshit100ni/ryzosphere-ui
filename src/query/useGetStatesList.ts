import { useQuery } from "react-query";

import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

export const fetchStateLists = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_STATE_LIST);
  return response.data.data;
};

export const useGetStateList = () => {
  return useQuery(["get-states"], fetchStateLists);
};
