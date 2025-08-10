/**
 * FoodyLog Main App Component
 * 
 * Root component that handles routing and global app state.
 * Implements SPA architecture with React Router for navigation.
 * Supports both web and mobile (Capacitor) environments.
 * Includes FoodyLog custom theme provider with shadcn/ui integration.
 */

import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ThemeProvider } from './lib/theme';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ComponentDemo } from './pages/ComponentDemo';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="foodylog-ui-theme">
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<ComponentDemo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;