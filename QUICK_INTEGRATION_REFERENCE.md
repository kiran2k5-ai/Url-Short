# Quick Implementation Reference

## Pattern 1: Make a Component Subscribe to Data Changes

```javascript
import useDataRefresh from "../hooks/useDataRefresh";
import { useData } from "../context/DataContext";

function MyComponent() {
  const { urls, analytics, refreshTrigger } = useData();
  
  // Auto-refresh when data changes
  useDataRefresh(() => {
    // Your refresh logic here
    console.log("Data refreshed!");
  });

  return (
    <div>
      {urls.map(url => (
        <div key={url._id}>{url.customAlias}</div>
      ))}
    </div>
  );
}
```

## Pattern 2: Handle CRUD Operations with Proper Feedback

```javascript
import toast from "react-hot-toast";
import { useData } from "../context/DataContext";

function MyComponent() {
  const { createUrl, updateUrl, deleteUrl, loading } = useData();
  
  const handleCreate = async () => {
    try {
      await createUrl({
        originalUrl: "https://example.com",
        customAlias: "my-link"
      });
      toast.success("URL created successfully!");
      // Component auto-updates via refreshTrigger
    } catch (error) {
      toast.error(error.message || "Failed to create URL");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateUrl(id, {
        originalUrl: "https://updated.com"
      });
      toast.success("URL updated!");
    } catch (error) {
      toast.error("Failed to update URL");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id);
      toast.success("URL deleted!");
    } catch (error) {
      toast.error("Failed to delete URL");
    }
  };

  return (
    <button disabled={loading} onClick={handleCreate}>
      {loading ? "Creating..." : "Create URL"}
    </button>
  );
}
```

## Pattern 3: Use User Data from AuthContext

```javascript
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, updateProfile } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = async (updates) => {
    try {
      await updateProfile(updates);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={() => handleUpdateProfile({ name: "New Name" })}>
        Update Name
      </button>
    </div>
  );
}
```

## Pattern 4: Handle Theme Changes Across App

```javascript
import { useTheme } from "../context/ThemeContext";

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </button>
      {/* Changes automatically apply across entire app */}
      {/* And persist to localStorage */}
    </div>
  );
}
```

## Pattern 5: Bulk Upload with Progress

```javascript
import { useData } from "../context/DataContext";

function BulkUploadPage() {
  const { bulkUploadUrls, bulkUploadProgress } = useData();
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      await bulkUploadUrls(file);
      toast.success("Bulk upload completed!");
      // All data automatically refreshed
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={bulkUploadProgress > 0}>
        Upload {bulkUploadProgress > 0 && `${bulkUploadProgress}%`}
      </button>
    </div>
  );
}
```

## Pattern 6: Dashboard Stats Auto-Update

```javascript
import { useData } from "../context/DataContext";
import useDataRefresh from "../hooks/useDataRefresh";

function Dashboard() {
  const { getDashboardStats } = useData();
  const [stats, setStats] = useState(null);

  // Auto-update stats when data changes
  useDataRefresh(() => {
    setStats(getDashboardStats());
  });

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <StatCard title="Total Links" value={stats.totalLinks} />
      <StatCard title="Total Clicks" value={stats.totalClicks} />
      <StatCard title="Active Links" value={stats.activeLinks} />
      {/* All stats calculated from real backend data */}
    </div>
  );
}
```

## Pattern 7: Modal with Immediate App Update

```javascript
import { useData } from "../context/DataContext";
import toast from "react-hot-toast";

function CreateUrlModal({ onClose }) {
  const { createUrl, loading } = useData();
  const [formData, setFormData] = useState({...});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUrl(formData);
      toast.success("URL created!");
      
      // Close modal and let app auto-refresh
      setTimeout(() => {
        onClose();
        // Dashboard, Recent Links, Analytics all update automatically
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

## Pattern 8: Analytics Auto-Sync

```javascript
import { useData } from "../context/DataContext";
import useDataRefresh from "../hooks/useDataRefresh";

function AnalyticsPage() {
  const { analytics, fetchAnalytics, urls } = useData();

  // Auto-fetch analytics when data changes
  useDataRefresh(async () => {
    for (const url of urls) {
      await fetchAnalytics(url._id);
    }
  });

  return (
    <div>
      {urls.map(url => (
        <div key={url._id}>
          <h3>{url.customAlias}</h3>
          <p>Clicks: {analytics[url._id]?.clicks || 0}</p>
          {/* Charts and stats from real data */}
        </div>
      ))}
    </div>
  );
}
```

## Essential Hooks to Use

### useData()
```javascript
const {
  urls,                    // All URLs
  loading,                 // API loading state
  error,                   // API error message
  analytics,              // Analytics data keyed by URL ID
  refreshTrigger,         // Changes when data needs refresh
  bulkUploadProgress,     // 0-100
  fetchUrls,              // Fetch all URLs
  createUrl,              // Create new URL
  updateUrl,              // Update URL
  deleteUrl,              // Delete URL
  bulkUploadUrls,         // Upload CSV
  fetchAnalytics,         // Fetch analytics for URL
  fetchAllAnalytics,      // Fetch all analytics
  getDashboardStats,      // Calculate dashboard stats
  triggerDataRefresh,     // Manual refresh trigger
  apiCall                 // Direct API call helper
} = useData();
```

### useAuth()
```javascript
const {
  token,                  // JWT token
  user,                   // User profile
  loading,                // Auth loading state
  error,                  // Auth error message
  login,                  // Login with JWT
  logout,                 // Logout user
  updateProfile,          // Update user profile
  isAuthenticated         // Boolean auth status
} = useAuth();
```

### useTheme()
```javascript
const {
  theme,                  // "light" or "dark"
  toggleTheme             // Switch theme
} = useTheme();
```

### useDataRefresh()
```javascript
// Auto-refresh when refreshTrigger changes
useDataRefresh(() => {
  // Your logic here
});

// With no callback, defaults to fetching URLs and analytics
useDataRefresh();
```

## Common Patterns for Each Page

### Dashboard
- Subscribe to refreshTrigger
- Calculate stats with getDashboardStats()
- Display RecentLinks component
- Show AnalyticsChart

### My Links
- Display urls array
- Edit button → EditUrlModal
- Delete button → call deleteUrl()
- Copy button → navigator.clipboard
- Analytics button → navigate to Analytics page

### Analytics
- Fetch analytics with fetchAnalytics()
- Display charts using analytics data
- Filter by URL selection
- Auto-update when refreshTrigger changes

### QR Codes
- Map through urls
- Display url.qrCode image
- Download functionality
- Auto-update on URL changes

### Profile
- Display user data from AuthContext
- Edit button to update profile
- Use updateProfile() to save changes

### Settings
- Theme toggle uses toggleTheme()
- Changes apply immediately
- Persists automatically

### Bulk Upload
- Handle file input
- Call bulkUploadUrls(file)
- Track bulkUploadProgress
- Auto-refresh after complete

---

## Error Handling Checklist

- [ ] Try-catch all async operations
- [ ] Display toast messages to user
- [ ] Show loading state during operations
- [ ] Disable buttons while loading
- [ ] Handle API errors gracefully
- [ ] Never expose raw error messages
- [ ] Provide helpful user feedback
- [ ] Log errors to console for debugging

---

**Copy and paste these patterns into your components to maintain consistency!**
