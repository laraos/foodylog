/**
 * App Component Tests
 * 
 * Tests for the main App component to ensure routing and
 * basic functionality works correctly.
 */

import { describe, it, expect } from 'vitest';
import { render, screen as testingScreen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Helper to render App with router
function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}

describe('App', () => {
  it('renders without crashing', () => {
    renderApp();
    expect(testingScreen.getByText('FoodyLog')).toBeInTheDocument();
  });

  it('displays the home page by default', () => {
    renderApp();
    expect(testingScreen.getByText('Welcome to FoodyLog')).toBeInTheDocument();
    expect(testingScreen.getByText('The simplest way to remember every meal that matters')).toBeInTheDocument();
  });

  it('shows app features on home page', () => {
    renderApp();
    expect(testingScreen.getByText('Capture Meals')).toBeInTheDocument();
    expect(testingScreen.getByText('Find & Filter')).toBeInTheDocument();
    expect(testingScreen.getByText('Track Insights')).toBeInTheDocument();
    expect(testingScreen.getByText('Works Offline')).toBeInTheDocument();
  });

  it('displays app version and environment info', () => {
    renderApp();
    expect(testingScreen.getByText('Version:')).toBeInTheDocument();
    expect(testingScreen.getByText('Environment:')).toBeInTheDocument();
    expect(testingScreen.getByText('PWA:')).toBeInTheDocument();
  });
});