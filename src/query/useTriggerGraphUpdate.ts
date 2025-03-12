import { useMutation } from "react-query";
import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

interface GraphUpdatePayload {
  url: string;
}

export const updateGraphData = async (payload: GraphUpdatePayload) => {
  const response = await axiosConfig.post(API_ENDPOINTS.IMPORT_SHEETS, payload);
  return response.data;
};

export const useTriggerGraphUpdate = () => {
  return useMutation(updateGraphData);
};
