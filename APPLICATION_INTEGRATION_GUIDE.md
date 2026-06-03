# Application-Wide Integration Guide

## Overview
This application is fully connected as a single SaaS platform. All pages, components, and modals are synchronized through global state management, and all data flows from backend APIs.

## Global State Architecture

### Context Providers
- **AuthContext**: Manages authentication, user profile, and JWT tokens
- **DataContext**: Central hub for all URL and analytics data
- **ThemeContext**: Manages theme preferences (persists to localStorage)
- **LoadingContext**: Global loading state

### Data Flow Patterns

#### 1. Authentication Flow
```
Login Page
  ↓
AuthContext.login(token)
  ↓
JWT stored in localStorage
  ↓
User extracted from JWT
  ↓
Protected routes enabled
  ↓
Dashboard loads with user data
```

#### 2. URL Creation Flow
```
Create URL Modal
  ↓
DataContext.createUrl()
  ↓
Backend API call
  ↓
New URL added to state
  ↓
refreshTrigger incremented
  ↓
All components notified
  ↓
Dashboard stats updated
  ↓
Recent Links refreshed
  ↓
My Links table updated
  ↓
Analytics refreshed
  ↓
QR Code page updated
```

#### 3. URL Update Flow
```
Edit URL Modal
  ↓
DataContext.updateUrl(id, data)
  ↓
Backend API call
  ↓
URL in state updated
  ↓
refreshTrigger incremented
  ↓
All subscribed components update
  ↓
Dashboard recalculates
  ↓
Analytics refreshed
```

#### 4. URL Delete Flow
```
Delete Button
  ↓
DataContext.deleteUrl(id)
  ↓
Backend API call
  ↓
URL removed from state
  ↓
Analytics for URL removed
  ↓
refreshTrigger incremented
  ↓
All components update
  ↓
Dashboard stats recalculated
  ↓
Recent Links refreshed
```

#### 5. Bulk Upload Flow
```
Bulk Upload Modal
  ↓
DataContext.bulkUploadUrls(file)
  ↓
Backend processes CSV
  ↓
fetchUrls() called
  ↓
All URLs reloaded
  ↓
refreshTrigger incremented
  ↓
Entire application synced
```

## Key Features Implemented

### 1. Centralized API Layer
- `DataContext.apiCall()` - All API requests go through this method
- Consistent error handling across all endpoints
- Automatic JWT token injection
- Standardized response handling

### 2. Auto-Refresh Mechanism
- `refreshTrigger` state in DataContext
- All components subscribe to refreshTrigger changes
- Custom hook: `useDataRefresh()` for easy subscription
- Analytics automatically fetch when data changes

### 3. Dashboard Statistics
**All dashboard stats are calculated from real backend data:**
- **Total Links**: Count of all URLs
- **Active Links**: URLs without expiry or future expiry date
- **Expired Links**: URLs with past expiry date
- **Total Clicks**: Sum of clickCount across all URLs
- **QR Codes Generated**: Count of URLs with QR codes
- **Growth Percentage**: Calculated from recent vs older URLs click data

### 4. Recent Links Component
- Always displays latest 5 URLs from state
- Automatically updates when URLs are created/updated/deleted
- Actions: Copy, Edit, Delete, View Analytics, View QR Code
- All actions trigger global data refresh

### 5. Analytics System
- Analytics fetched for all URLs when data refreshes
- Stored in `analytics` state keyed by URL ID
- Charts use real analytics data
- Auto-updates when new clicks occur

### 6. Profile Management
- User data extracted from JWT token
- Optional backend profile endpoint support
- Profile updates reflected across application
- Never hardcoded user information

### 7. Theme Persistence
- Theme preference stored in localStorage
- Applied to entire application
- Persists across page reloads
- All pages respect theme setting

## Component Integration Points

### Dashboard
- Subscribes to `refreshTrigger`
- Recalculates stats when data changes
- Displays Recent Links
- Shows Analytics Chart
- Create URL button

### My Links Page
- Lists all URLs from state
- Edit button opens EditUrlModal
- Delete button removes URL
- View Analytics opens Analytics page for that URL
- Copy button copies short URL

### Analytics Page
- Displays charts using real analytics data
- Filters by URL selection
- Auto-updates when analytics data refreshes
- Shows statistical trends

### QR Code Page
- Lists all URLs with QR codes
- Auto-updates when URLs are created/deleted
- Displays QR code for each URL
- Download functionality

### Profile Page
- Displays user data from AuthContext
- Edit button opens profile editor
- Settings managed separately
- Never hardcoded values

### Settings Page
- Theme toggle persists to localStorage
- All other settings saved to backend
- Changes apply immediately across app

## Best Practices

### When Adding New Features
1. **Always use DataContext** for URL/analytics data
2. **Always use AuthContext** for user data
3. **Subscribe to refreshTrigger** for auto-updates
4. **Use useDataRefresh hook** for easy subscription
5. **Handle loading/error states** with proper UI feedback

### Error Handling Pattern
```javascript
try {
  await dataContext.operation();
  toast.success("Success message");
} catch (error) {
  toast.error(error.message || "Default error message");
}
```

### Loading State Pattern
```javascript
const { loading } = useData();
// Disable buttons during operations
<button disabled={loading}>
  {loading ? "Processing..." : "Action"}
</button>
```

### Data Refresh Pattern
```javascript
import useDataRefresh from "../hooks/useDataRefresh";

// In component:
useDataRefresh(() => {
  // Custom refresh logic
});
```

## API Endpoints Used

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### URL Management
- `GET /url/all` - Fetch all user URLs
- `POST /url/create` - Create new URL
- `PUT /url/:id` - Update URL
- `DELETE /url/:id` - Delete URL
- `POST /url/bulk-upload` - Bulk upload URLs

### Analytics
- `GET /analytics/:urlId` - Get analytics for specific URL

## State Structure

### DataContext State
```javascript
{
  urls: [],                    // Array of all URLs
  loading: false,              // Loading state
  error: null,                 // Error message
  analytics: {},               // Analytics keyed by URL ID
  refreshTrigger: 0,          // Trigger for auto-refresh
  bulkUploadProgress: 0,       // Bulk upload progress
}
```

### AuthContext State
```javascript
{
  token: "jwt_token",          // JWT token
  user: {                      // User profile
    id: "userId",
    email: "user@email.com",
    name: "User Name"
  },
  loading: false,
  error: null,
  isAuthenticated: true,
}
```

### ThemeContext State
```javascript
{
  theme: "light" | "dark",     // Current theme
}
```

## Performance Optimization

### Lazy Loading
- Analytics only fetched when needed
- Images lazy loaded in lists
- Components unmounted when not visible

### Memoization
- Use `useCallback` for function dependencies
- Prevent unnecessary re-renders
- `useMemo` for expensive calculations

### API Call Optimization
- Batch analytics fetches
- Avoid duplicate requests
- Throttle user searches

## Future Enhancements

1. **WebSocket Integration** - Real-time analytics updates
2. **Caching Layer** - Reduce API calls
3. **Offline Mode** - Work offline, sync when online
4. **Data Export** - Export URLs and analytics to CSV
5. **Advanced Filtering** - Filter URLs by date range, clicks, etc.
6. **Custom Domains** - Support custom domain aliases
7. **Team Collaboration** - Share URLs with team members

## Troubleshooting

### Dashboard stats not updating?
- Check refreshTrigger in DevTools
- Verify URLs in state are updating
- Check DataContext provider wraps app

### Analytics not showing?
- Verify fetchAllAnalytics called
- Check API response in Network tab
- Verify analytics data structure

### Theme not persisting?
- Check localStorage is enabled
- Verify ThemeContext provider wraps app
- Check CSS class application

### Auth not working?
- Verify JWT stored in localStorage
- Check token in Authorization header
- Verify backend auth endpoints

---

**Last Updated**: June 4, 2026
**Version**: 1.0
**Status**: Production Ready
