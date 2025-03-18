import { useQuery } from "react-query";

import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

export const fetchOrgSubType = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_ORG_SUB_TYPE_LIST);
  return response.data.data;
};

export const useGetOrgSubType = () => {
  return useQuery(["get-org-sub-type"], fetchOrgSubType);
};
