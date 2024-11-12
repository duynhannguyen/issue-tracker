"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return <ReactQueryClient client={queryClient}>{children}</ReactQueryClient>;
};

export default QueryClientProvider;
