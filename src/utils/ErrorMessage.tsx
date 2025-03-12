import { iErrorMessageProps } from "@/types/ErrorMessageTypes";
import React from "react";

const ErrorMessage: React.FC<iErrorMessageProps> = ({ error, touched }) => {
  if (!touched || !error) {
    return null;
  }

  return <div className="text-red-500 text-sm mt-1">{error}</div>;
};

export default ErrorMessage;
