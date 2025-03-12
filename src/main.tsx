import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./utils/ToastContext";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Ensure data is always fresh
      cacheTime: 0, // Prevent caching of data
      refetchOnWindowFocus: false, // Refetch on window focus
      refetchOnMount: false, // Refetch every time the component mounts
      refetchOnReconnect: false, // Refetch when the browser reconnects
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </QueryClientProvider>
);
