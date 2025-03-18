import { useQuery } from "react-query";

import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

export const fetchGetProductTags = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_PRODUCT_LIST);
  return response.data.data;
};

export const useGetProductTags = () => {
  return useQuery(["get-productTags"], fetchGetProductTags);
};
