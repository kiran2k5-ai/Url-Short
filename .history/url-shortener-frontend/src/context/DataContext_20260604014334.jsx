import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const DataContext = createContext();
const API_BASE_URL = "https://url-short-caxa.onrender.com/api";

export function DataProvider({ children }) {
  const { token } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [bulkUploadProgress, setBulkUploadProgress] = useState(0);
  const dataRefreshTimeouts = useRef({});

  // Centralized fetch helper
  const apiCall = useCallback(async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "API request failed");
      }
      
      return await response.json();
    } catch (err) {
      throw err;
    }
  }, [token]);

  // Trigger global data refresh
  const triggerDataRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Fetch all URLs
  const fetchUrls = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall("/url/all");
      setUrls(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  }, [token, apiCall]);

  // Create URL
  const createUrl = useCallback(
    async (urlData) => {
      if (!token) throw new Error("Not authenticated");
      try {
        const data = await apiCall("/url/create", {
          method: "POST",
          body: JSON.stringify(urlData),
        });
        setUrls((prev) => [data.data, ...prev]);
        triggerDataRefresh();
        return data;
      } catch (err) {
        throw err;
      }
    },
    [token, apiCall, triggerDataRefresh]
  );

  // Update URL
  const updateUrl = useCallback(
    async (id, urlData) => {
      if (!token) throw new Error("Not authenticated");
      try {
        const data = await apiCall(`/url/${id}`, {
          method: "PUT",
          body: JSON.stringify(urlData),
        });
        setUrls((prev) =>
          prev.map((url) => (url._id === id ? data.data : url))
        );
        triggerDataRefresh();
        return data;
      } catch (err) {
        throw err;
      }
    },
    [token, apiCall, triggerDataRefresh]
  );

  // Delete URL
  const deleteUrl = useCallback(
    async (id) => {
      if (!token) throw new Error("Not authenticated");
      try {
        await apiCall(`/url/${id}`, {
          method: "DELETE",
        });
        setUrls((prev) => prev.filter((url) => url._id !== id));
        setAnalytics((prev) => {
          const newAnalytics = { ...prev };
          delete newAnalytics[id];
          return newAnalytics;
        });
        triggerDataRefresh();
      } catch (err) {
        throw err;
      }
    },
    [token, apiCall, triggerDataRefresh]
  );

  // Bulk upload URLs
  const bulkUploadUrls = useCallback(
    async (file) => {
      if (!token) throw new Error("Not authenticated");
      try {
        setBulkUploadProgress(0);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/url/bulk-upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Bulk upload failed");
        }

        const data = await response.json();
        setBulkUploadProgress(100);
        
        // Refresh URLs after upload
        await fetchUrls();
        triggerDataRefresh();
        
        return data;
      } catch (err) {
        setBulkUploadProgress(0);
        throw err;
      }
    },
    [token, fetchUrls, triggerDataRefresh]
  );

  // Fetch analytics for a specific URL
  const fetchAnalytics = useCallback(
    async (urlId) => {
      if (!token) return;
      try {
        const data = await apiCall(`/analytics/${urlId}`);
        setAnalytics((prev) => ({ ...prev, [urlId]: data }));
        return data;
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    },
    [token, apiCall]
  );

  // Fetch analytics for all URLs
  const fetchAllAnalytics = useCallback(async () => {
    if (!token || !urls.length) return;
    try {
      const analyticsMap = {};
      await Promise.allSettled(
        urls.map(async (url) => {
          try {
            const data = await apiCall(`/analytics/${url._id}`);
            analyticsMap[url._id] = data;
          } catch (err) {
            console.error(`Failed to fetch analytics for ${url._id}:`, err);
          }
        })
      );
      setAnalytics(analyticsMap);
    } catch (err) {
      console.error("Failed to fetch all analytics:", err);
    }
  }, [token, urls, apiCall]);

  // Calculate dashboard stats from real backend data
  const getDashboardStats = useCallback(() => {
    if (!urls.length) {
      return {
        totalLinks: 0,
        activeLinks: 0,
        expiredLinks: 0,
        totalClicks: 0,
        qrCodesGenerated: 0,
        growth: 0,
      };
    }

    const now = new Date();
    const activeLinks = urls.filter(
      (url) => !url.expiryDate || new Date(url.expiryDate) > now
    ).length;
    const expiredLinks = urls.filter(
      (url) => url.expiryDate && new Date(url.expiryDate) <= now
    ).length;
    const totalClicks = urls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    const qrCodesGenerated = urls.filter((url) => url.qrCode).length;

    return {
      totalLinks: urls.length,
      activeLinks,
      expiredLinks,
      totalClicks,
      qrCodesGenerated,
      growth: calculateGrowth(urls),
    };
  }, [urls]);

  // Calculate growth percentage
  const calculateGrowth = (urlList) => {
    if (urlList.length < 2) return 0;
    
    const recentUrls = urlList.slice(0, Math.ceil(urlList.length / 2));
    const olderUrls = urlList.slice(Math.ceil(urlList.length / 2));
    
    const recentClicks = recentUrls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    const olderClicks = olderUrls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    
    if (olderClicks === 0) return recentClicks > 0 ? 100 : 0;
    return Math.round(((recentClicks - olderClicks) / olderClicks) * 100);
  };

  // Auto-refresh data when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0 && urls.length > 0) {
      fetchAllAnalytics();
    }
  }, [refreshTrigger, fetchAllAnalytics, urls.length]);

  // Fetch URLs and analytics on component mount
  useEffect(() => {
    if (token) {
      fetchUrls();
    }

    return () => {
      // Cleanup any pending timeouts
      Object.values(dataRefreshTimeouts.current).forEach(clearTimeout);
    };
  }, [token, fetchUrls]);

  return (
    <DataContext.Provider
      value={{
        urls,
        loading,
        error,
        analytics,
        refreshTrigger,
        bulkUploadProgress,
        fetchUrls,
        createUrl,
        updateUrl,
        deleteUrl,
        bulkUploadUrls,
        fetchAnalytics,
        fetchAllAnalytics,
        getDashboardStats,
        triggerDataRefresh,
        apiCall,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};
