import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes';
import Layout from './components/Layout';
import ErrorFallback from './components/ErrorFallback';

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ToastProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;