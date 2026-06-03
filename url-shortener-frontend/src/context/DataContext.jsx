import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export function DataProvider({ children }) {
  const { token } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch all URLs
  const fetchUrls = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://url-short-caxa.onrender.com/api/url/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUrls(Array.isArray(data) ? data : []);
      } else {
        throw new Error("Failed to fetch URLs");
      }
    } catch (err) {
      setError(err.message);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Create URL
  const createUrl = useCallback(
    async (urlData) => {
      if (!token) throw new Error("Not authenticated");
      try {
        const response = await fetch("https://url-short-caxa.onrender.com/api/url/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(urlData),
        });
        if (!response.ok) throw new Error("Failed to create URL");
        const data = await response.json();
        setUrls((prev) => [data.data, ...prev]);
        setRefreshTrigger((prev) => prev + 1);
        return data;
      } catch (err) {
        throw err;
      }
    },
    [token]
  );

  // Update URL
  const updateUrl = useCallback(
    async (id, urlData) => {
      if (!token) throw new Error("Not authenticated");
      try {
        const response = await fetch(`https://url-short-caxa.onrender.com/api/url/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(urlData),
        });
        if (!response.ok) throw new Error("Failed to update URL");
        const data = await response.json();
        setUrls((prev) =>
          prev.map((url) => (url._id === id ? data.data : url))
        );
        setRefreshTrigger((prev) => prev + 1);
        return data;
      } catch (err) {
        throw err;
      }
    },
    [token]
  );

  // Delete URL
  const deleteUrl = useCallback(
    async (id) => {
      if (!token) throw new Error("Not authenticated");
      try {
        const response = await fetch(`https://url-short-caxa.onrender.com/api/url/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to delete URL");
        setUrls((prev) => prev.filter((url) => url._id !== id));
        setAnalytics((prev) => {
          const newAnalytics = { ...prev };
          delete newAnalytics[id];
          return newAnalytics;
        });
        setRefreshTrigger((prev) => prev + 1);
      } catch (err) {
        throw err;
      }
    },
    [token]
  );

  // Mock data for geolocation and device
  const MOCK_CITIES = ['New York', 'London', 'Tokyo', 'Dubai', 'Singapore', 'Toronto', 'Sydney', 'Paris', 'Berlin', 'San Francisco'];
  const MOCK_COUNTRIES = ['United States', 'United Kingdom', 'Japan', 'United Arab Emirates', 'Singapore', 'Canada', 'Australia', 'France', 'Germany', 'Netherlands'];
  const MOCK_DEVICES = ['Mobile', 'Desktop', 'Tablet'];
  const MOCK_BROWSERS = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'];

  // Helper to enrich visits with mock geolocation data
  const enrichVisitsWithGeoData = (visits) => {
    if (!visits || visits.length === 0) return [];
    
    return visits.map(visit => ({
      ...visit,
      city: visit.city || MOCK_CITIES[Math.floor(Math.random() * MOCK_CITIES.length)],
      country: visit.country || MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)],
      device: visit.device || MOCK_DEVICES[Math.floor(Math.random() * MOCK_DEVICES.length)],
      browser: visit.browser || MOCK_BROWSERS[Math.floor(Math.random() * MOCK_BROWSERS.length)]
    }));
  };

  // Fetch analytics for a specific URL
  const fetchAnalytics = useCallback(
    async (urlId) => {
      if (!token) return;
      try {
        const response = await fetch(
          `https://url-short-caxa.onrender.com/api/analytics/${urlId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          let data = await response.json();
          // Enrich with mock geolocation data if not available
          if (data.recentVisits) {
            data.recentVisits = enrichVisitsWithGeoData(data.recentVisits);
          }
          setAnalytics((prev) => ({ ...prev, [urlId]: data }));
          return data;
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    },
    [token]
  );

  // Calculate dashboard stats
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

    return {
      totalLinks: urls.length,
      activeLinks,
      expiredLinks,
      totalClicks,
      qrCodesGenerated: urls.length, // All URLs have QR codes
      growth: Math.round(Math.random() * 15) + 5, // Placeholder for growth calculation
    };
  }, [urls]);

  // Fetch URLs on component mount
  useEffect(() => {
    if (token) {
      fetchUrls();
    }
  }, [token, fetchUrls]);

  return (
    <DataContext.Provider
      value={{
        urls,
        loading,
        error,
        analytics,
        refreshTrigger,
        fetchUrls,
        createUrl,
        updateUrl,
        deleteUrl,
        fetchAnalytics,
        getDashboardStats,
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
