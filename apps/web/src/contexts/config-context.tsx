import { useQuery } from "@tanstack/react-query";
import type { ClientConfig } from "@zohan/api/config";
import { type ReactNode, createContext, useContext } from "react";
import { trpc } from "@/trpc/client";

interface ConfigContextType {
  appConfig: ClientConfig;
  isLoading: boolean;
  error: unknown;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: bubu,
    isLoading,
    error,
  } = useQuery(
    trpc.clientConfig.getConfig.queryOptions(undefined, {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }),
  );    
  const contextValue: ConfigContextType = {
    // @ts-expect-error - config is not undefined
    appConfig: bubu,
    isLoading,
    error,
  };

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
};