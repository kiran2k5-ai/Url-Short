# Application Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER BROWSER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              React Context Providers (App.jsx)             │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │ │
│  │  │  AuthContext │  │ DataContext  │  │ ThemeContext │    │ │
│  │  │              │  │              │  │              │    │ │
│  │  │ • user       │  │ • urls[]     │  │ • theme      │    │ │
│  │  │ • token      │  │ • analytics  │  │              │    │ │
│  │  │ • login()    │  │ • loading    │  │ • toggleTheme│    │ │
│  │  │ • logout()   │  │              │  │              │    │ │
│  │  └──────────────┘  │ • createUrl()│  └──────────────┘    │ │
│  │                    │ • updateUrl()│                       │ │
│  │                    │ • deleteUrl()│   ┌──────────────┐    │ │
│  │                    │              │   │LoadingContext│    │ │
│  │                    │ • refreshTrig│   │              │    │ │
│  │                    │   ger        │   │ • isLoading  │    │ │
│  │                    └──────────────┘   └──────────────┘    │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────┐   │ │
│  │  │           All Components Have Access               │   │ │
│  │  │        (via useData, useAuth, useTheme)            │   │ │
│  │  └────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    PAGE COMPONENTS                          │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  Dashboard ─→ RecentLinks ─→ AnalyticsChart              │ │
│  │     │                                                       │ │
│  │     ├─ My Links                                            │ │
│  │     ├─ Analytics                                           │ │
│  │     ├─ QR Codes                                            │ │
│  │     ├─ Profile                                             │ │
│  │     ├─ Settings                                            │ │
│  │     └─ Bulk Upload                                         │ │
│  │                                                              │ │
│  │  All pages use useDataRefresh() for auto-updates           │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  MODAL COMPONENTS                           │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  • CreateUrlModal ─→ useData().createUrl()               │ │
│  │  • EditUrlModal   ─→ useData().updateUrl()               │ │
│  │  • DeleteModal    ─→ useData().deleteUrl()               │ │
│  │  • QRPreviewModal ─→ Display QR code                      │ │
│  │                                                              │ │
│  │  All modals trigger refreshTrigger on success             │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                    localStorage (JWT, theme)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND API                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Auth Endpoints  │  │  URL Endpoints   │  │   Analytics  │  │
│  │                  │  │                  │  │              │  │
│  │ POST /login      │  │ GET /url/all     │  │ GET /analyt- │  │
│  │ POST /signup     │  │ POST /url/create │  │ ics/:urlId   │  │
│  │ GET /profile     │  │ PUT /url/:id     │  │              │  │
│  │ PUT /profile     │  │ DELETE /url/:id  │  │              │  │
│  │                  │  │ POST /bulk-upload│  │              │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    DATABASE                               │  │
│  │  • Users          • URLs          • Analytics/Clicks     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Pattern: Creating a URL

```
User Action (Click "Create Link")
         ↓
CreateUrlModal opens
         ↓
User fills form → User clicks "Create"
         ↓
Modal calls: await useData().createUrl(data)
         ↓
DataContext.createUrl():
  1. Call API: POST /api/url/create
  2. Update urls[] state
  3. Increment refreshTrigger
         ↓
refreshTrigger changes → All components notified
         ↓
useDataRefresh() subscribers react:
  ├─→ Dashboard recalculates stats
  ├─→ RecentLinks re-renders
  ├─→ My Links page updates
  ├─→ QR Code page shows new code
  └─→ Analytics fetches data for new URL
         ↓
toast.success("URL created!")
         ↓
Modal closes after 2 seconds
         ↓
User sees updated Dashboard
```

## Component Subscription Pattern

```
Component A (Dashboard)
    ↓
    import { useData } from DataContext
    import useDataRefresh from hooks
    ↓
    In component:
      const { getDashboardStats, refreshTrigger } = useData();
      useDataRefresh(() => {
        setStats(getDashboardStats());
      });
    ↓
    Watches refreshTrigger
         ↓
Component B (My Links)          Component C (Analytics)
    ↓                                   ↓
    Also watches                   Also watches
    refreshTrigger                 refreshTrigger
         ↓                                ↓
    When refreshTrigger                When refreshTrigger
    changes: All update!              changes: All update!
         ↓
    All components stay in sync automatically
```

## State Update Cascade

```
Action triggered anywhere in app
         ↓
    CRUD operation called
    (createUrl/updateUrl/deleteUrl)
         ↓
    Backend API request
         ↓
    Response successful
         ↓
    Update state in DataContext
    (urls[], analytics)
         ↓
    Increment refreshTrigger
         ↓
    useEffect triggered in all components
    watching refreshTrigger
         ↓
    Each component re-renders with new data
         ↓
    User sees consistent updates everywhere
         ↓
    No manual refresh needed
    No page reload needed
    Perfect UX ✨
```

## Error Handling Pattern

```
User action
    ↓
Try block starts
    ↓
CRUD operation called
    ↓
    ├─ Success path:
    │  └─ State updated
    │     └─ refreshTrigger incremented
    │        └─ Components update
    │           └─ toast.success()
    │
    └─ Error path:
       └─ Catch error
          └─ Extract error message
             └─ toast.error(message)
                └─ User informed
                   └─ State unchanged
```

## Component Connection Map

```
                        ┌─────────────┐
                        │  Dashboard  │
                        └──────┬──────┘
                               │ contains
                    ┌──────────┴──────────┐
                    ↓                     ↓
            ┌─────────────────┐  ┌──────────────────┐
            │  RecentLinks    │  │ AnalyticsChart   │
            └────────┬────────┘  └────────┬─────────┘
                     │                    │
            Create/Edit/Delete        Fetch Analytics
                     │                    │
        ┌────────────┼─────────────┐      │
        ↓            ↓             ↓      ↓
    CreateUrl  EditUrlModal  DeleteModal DataContext
    Modal      Modal         Modal       (updates all)
        │        │             │
        └────────┼─────────────┘
                 ↓
    DataContext.createUrl()
    DataContext.updateUrl()
    DataContext.deleteUrl()
                 ↓
        Backend API Call
                 ↓
        Update state & trigger refresh
                 ↓
    All components receive update via refreshTrigger
```

## Authentication Flow

```
Login Page
    ↓
User enters credentials
    ↓
Call: await useAuth().login(token)
    ↓
AuthContext:
  1. Extract user from JWT
  2. Store token in localStorage
  3. Set user state
    ↓
App detects isAuthenticated = true
    ↓
Protected routes enabled
    ↓
Dashboard loads with user data
    ↓
DataContext loads all URLs
    ↓
Full app functionality available

---

Logout:
    ↓
Call: useAuth().logout()
    ↓
AuthContext:
  1. Clear token from localStorage
  2. Clear user state
  3. Set isAuthenticated = false
    ↓
App redirects to login
    ↓
DataContext state cleared
    ↓
All components reset
```

## API Call Pattern

```
DataContext.apiCall(endpoint, options)
    ↓
Check for token
    ↓
Prepare headers:
  • Authorization: Bearer {token}
  • Content-Type: application/json
    ↓
Make fetch request
    ↓
    ├─ Success (response.ok):
    │  └─ Parse JSON
    │     └─ Return data
    │
    └─ Failure (not response.ok):
       └─ Parse error
          └─ Throw error
             └─ Component catches
                └─ Shows toast.error()
```

## Theme System

```
ThemeContext
    ↓
    ├─ Initial: Read from localStorage
    ├─ Current: In React state
    └─ On toggle: Save to localStorage
         ↓
    useTheme() hook available to all
         ↓
    theme = "light" or "dark"
         ↓
    Applied via CSS classes:
    • document.documentElement.classList
    • Tailwind dark: prefix
         ↓
    All components styled conditionally
         ↓
    Persists across page reloads
```

## Loading & Error States

```
Before Operation:
  loading = false
  error = null
  Component enabled
    ↓
During Operation:
  loading = true
  error = null
  Component disabled (buttons, inputs)
    ↓
After Success:
  loading = false
  error = null
  State updated
  Components re-render
    ↓
After Error:
  loading = false
  error = "error message"
  State unchanged
  Component enabled (user can retry)
```

---

**Key Principle**: Once any data changes anywhere in the app, the `refreshTrigger` increments, notifying all subscribed components to re-render with fresh data. This creates a seamless, synchronized experience.

