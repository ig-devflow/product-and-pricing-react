import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/providers/query-client';
import { router } from '@/app/providers/router';
import { APP_CONFIG } from '@/shared/config/env';
import '@/app/styles/index.css';

const enableMocking = async () => {
  if (!APP_CONFIG.useMswInBrowser) {
    return;
  }

  const { worker } = await import('@/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
};

const renderApp = () => {
  if (navigator.webdriver) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
};

void enableMocking().then(renderApp);
