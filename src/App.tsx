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
import { AppLayout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { AddMealPage } from './pages/AddMealPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ComponentDemo } from './pages/ComponentDemo';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="foodylog-ui-theme">
      <AppLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/add" element={<AddMealPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/components" element={<ComponentDemo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;