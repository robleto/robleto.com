"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error?: Error}>;
}

const DefaultErrorFallback: React.FC<{error?: Error}> = ({ error }) => (
  <div className="min-h-[400px] flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        We're sorry, but something unexpected happened. Please try refreshing the page.
      </p>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-4">
          <summary className="cursor-pointer font-medium">Error Details</summary>
          <pre className="mt-2 text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap">
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You could send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
