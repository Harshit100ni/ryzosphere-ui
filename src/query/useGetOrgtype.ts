import { useQuery } from "react-query";

import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

export const fetchOrgType = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_ORG_TYPE_LIST);
  return response.data.data;
};

export const useGetOrgType = () => {
  return useQuery(["get-org-type"], fetchOrgType);
};
