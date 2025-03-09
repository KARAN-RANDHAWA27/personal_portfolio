"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Loader from "./Loader";

// Define the context type
interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
  updateProgress: (progress: number) => void;
}

// Create the context with a default value
const LoaderContext = createContext<LoaderContextType>({
  showLoader: () => {},
  hideLoader: () => {},
  updateProgress: () => {},
});

// Custom hook to use the loader context
export const useLoader = () => useContext(LoaderContext);

// Props for the provider component
interface LoaderProviderProps {
  children: ReactNode;
}

// The provider component
export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Show the loader
  const showLoader = () => {
    setVisible(true);
  };

  // Hide the loader
  const hideLoader = () => {
    setVisible(false);
    // Reset progress when hidden
    setTimeout(() => {
      setProgress(0);
    }, 300);
  };

  // Update progress (0 to 1)
  const updateProgress = (newProgress: number) => {
    // Ensure progress is between 0 and 1
    const clampedProgress = Math.min(Math.max(newProgress, 0), 1);
    setProgress(clampedProgress);
  };

  return (
    <LoaderContext.Provider
      value={{
        showLoader,
        hideLoader,
        updateProgress,
      }}
    >
      {children}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <Loader progress={progress} />
        </div>
      )}
    </LoaderContext.Provider>
  );
};
