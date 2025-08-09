/**
 * FoodyLog Main App Component
 * 
 * Root component that handles routing and global app state.
 * Implements SPA architecture with React Router for navigation.
 * Supports both web and mobile (Capacitor) environments.
 */

import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { Suspense } from 'react'

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App