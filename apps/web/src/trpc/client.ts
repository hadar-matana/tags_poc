import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@zohan/api/trpc/routers/_app';
import { config } from '../../config';
import superjson from 'superjson';
const trpcUrl = new URL(
  [config.trpcServerPrefix, "trpc"].filter(Boolean).join("/"),
  config.apiBase
).toString();

export const queryClient = new QueryClient();

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: trpcUrl,
      transformer: superjson,
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
