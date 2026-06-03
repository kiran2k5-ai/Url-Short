import { useEffect, useCallback } from "react";
import { useData } from "../context/DataContext";

/**
 * Custom hook to handle data refresh across components
 * Automatically refetches data when refreshTrigger changes
 */
export const useDataRefresh = (callback) => {
  const { refreshTrigger, fetchUrls, fetchAllAnalytics } = useData();

  useEffect(() => {
    if (refreshTrigger > 0) {
      if (callback) {
        callback();
      } else {
        // Default refresh behavior
        fetchUrls();
        fetchAllAnalytics();
      }
    }
  }, [refreshTrigger, callback, fetchUrls, fetchAllAnalytics]);
};

export default useDataRefresh;
