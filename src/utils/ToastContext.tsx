import { createContext, useContext, ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast"; // Importing from react-hot-toast
import { ToastContextType } from "../types/toastTypes";

// Create a ToastContext to provide the toast functions
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// The ToastProvider component wraps the app and provides toast functions
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 3000, // Duration in ms
      position: "top-center", // Position on the screen
      style: {
        background: "green",
        color: "white",
        boxShadow: "-moz-initial",
      },
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "red",
        color: "white",
      },
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "blue",
        color: "white",
      },
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      {/* Only one Toaster component should be in your app */}
      <Toaster />
    </ToastContext.Provider>
  );
};

// Custom hook to access the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
