"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "../store";
import GlobalCssPriority from "@/globalcss-priority";

const queryClient = new QueryClient();

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalCssPriority>
          <CssBaseline />
          {children}
        </GlobalCssPriority>
      </QueryClientProvider>
    </Provider>
  );
}
