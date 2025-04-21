import { iErrorMessageProps } from "@/types/ErrorMessageTypes";
import React from "react";

const ErrorMessage: React.FC<iErrorMessageProps> = ({ error, touched }) => {
  if (!touched) {
    return null;
  }

  const displayError = error || "This field is required";

  return <div className="text-red-500 text-sm mt-1">{displayError}</div>;
};

export default ErrorMessage;
