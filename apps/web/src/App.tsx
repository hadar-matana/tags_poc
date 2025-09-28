import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import '@zohan/ui/globals.css';
import './styles.css';
import { queryClient } from './trpc/client';
import { setDefaultOptions } from 'date-fns';
import { he } from 'date-fns/locale';
import { ConfigProvider, useConfigContext } from './contexts/config-context';

setDefaultOptions({
  locale: he,
});

function InnerApp() {
  const config = useConfigContext();

  if (config.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <InnerApp />
      </ConfigProvider>
    </QueryClientProvider>
  );
};
