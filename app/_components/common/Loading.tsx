import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton" | "pulse";
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<{size: string}> = ({ size }) => (
  <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-600 ${size}`}></div>
);

const LoadingSkeleton: React.FC<{size: string}> = ({ size }) => (
  <div className="animate-pulse space-y-4">
    <div className={`bg-gray-300 dark:bg-gray-700 rounded ${size}`}></div>
    <div className="space-y-2">
      <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4"></div>
      <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
    </div>
  </div>
);

const LoadingPulse: React.FC<{size: string}> = ({ size }) => (
  <div className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${size}`}></div>
);

const Loading: React.FC<LoadingProps> = ({ 
  size = "md", 
  variant = "spinner", 
  text,
  className = ""
}) => {
  const sizeClasses = {
    sm: variant === "spinner" ? "h-4 w-4" : "h-20",
    md: variant === "spinner" ? "h-8 w-8" : "h-32",
    lg: variant === "spinner" ? "h-12 w-12" : "h-48"
  };

  const sizeClass = sizeClasses[size];

  const renderLoadingComponent = () => {
    switch (variant) {
      case "skeleton":
        return <LoadingSkeleton size={sizeClass} />;
      case "pulse":
        return <LoadingPulse size={sizeClass} />;
      default:
        return <LoadingSpinner size={sizeClass} />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {renderLoadingComponent()}
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
          {text}
        </p>
      )}
    </div>
  );
};

// Gallery Loading Component
export const GalleryLoading: React.FC<{count?: number}> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-md mb-4"></div>
        <div className="space-y-2">
          <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// List Loading Component
export const ListLoading: React.FC<{count?: number}> = ({ count = 4 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="animate-pulse flex items-center space-x-4 p-4 border rounded-md">
        <div className="bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-3 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;
