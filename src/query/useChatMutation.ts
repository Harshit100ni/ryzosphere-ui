import { useMutation } from "react-query";

import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";

export interface ChatQueryPayload {
  query: string;
}

export const fetchChatResponse = async (payload: ChatQueryPayload) => {
  const response = await axiosConfig.post(API_ENDPOINTS.CHAT, payload);
  return response.data;
};

export const useChatMutation = (onSuccessCallback?: (data: any) => void) => {
  return useMutation(fetchChatResponse, {
    onMutate: async (variables: ChatQueryPayload) => {
      return variables;
    },
    onSuccess: (data, variables) => {
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
