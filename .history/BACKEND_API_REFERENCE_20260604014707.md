# Backend API Reference for Frontend

## Base URL
```
https://url-short-caxa.onrender.com/api
```

## Authentication
All endpoints (except login/signup) require:
```
Authorization: Bearer {JWT_TOKEN}
```

The JWT token is automatically included by `DataContext.apiCall()`.

---

## Auth Endpoints

### 1. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Used By:** Login page
**Error Handling:** Show error message from response

---

### 2. Signup
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Used By:** Signup page
**Error Handling:** Validate password strength, check email not in use

---

### 3. Get User Profile
**Endpoint:** `GET /auth/profile`

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response (Success):**
```json
{
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "url_or_null",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**Used By:** AuthContext (auto-called on login)
**Error Handling:** Fallback to JWT decoding if endpoint fails

---

### 4. Update User Profile
**Endpoint:** `PUT /auth/profile`

**Request Body:**
```json
{
  "name": "New Name",
  "avatar": "new_avatar_url"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "name": "New Name",
    "avatar": "new_avatar_url"
  }
}
```

**Used By:** Profile page
**Called Via:** `useAuth().updateProfile(updates)`

---

## URL Management Endpoints

### 1. Get All URLs
**Endpoint:** `GET /url/all`

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response (Success):**
```json
[
  {
    "_id": "urlId1",
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://short.url/abc123",
    "customAlias": "my-link",
    "qrCode": "data:image/png;base64,...",
    "clickCount": 42,
    "expiryDate": "2025-12-31T23:59:59Z",
    "createdAt": "2024-06-04T10:00:00Z",
    "updatedAt": "2024-06-04T15:30:00Z"
  },
  ...
]
```

**Used By:** DataContext (fetches on app load)
**Called Via:** `useData().fetchUrls()`

---

### 2. Create URL
**Endpoint:** `POST /url/create`

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "customAlias": "my-link",          // optional
  "expiryDays": 30,                  // optional
  "expiryDate": "2025-12-31"         // optional (ISO format)
}
```

**Response (Success):**
```json
{
  "data": {
    "_id": "newUrlId",
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://short.url/abc123",
    "customAlias": "my-link",
    "qrCode": "data:image/png;base64,...",
    "clickCount": 0,
    "expiryDate": "2025-12-31T23:59:59Z",
    "createdAt": "2024-06-04T10:00:00Z"
  },
  "message": "URL created successfully"
}
```

**Used By:** CreateUrlModal
**Called Via:** `useData().createUrl(urlData)`
**Side Effects:** 
- New URL added to state
- refreshTrigger incremented
- All components notified

---

### 3. Update URL
**Endpoint:** `PUT /url/:id`

**URL Params:**
- `id`: The URL ID to update

**Request Body:**
```json
{
  "originalUrl": "https://updated-example.com",
  "customAlias": "updated-alias",
  "expiryDate": "2025-12-31"
}
```

**Response (Success):**
```json
{
  "data": {
    "_id": "urlId",
    "originalUrl": "https://updated-example.com",
    "shortUrl": "http://short.url/abc123",
    "customAlias": "updated-alias",
    "qrCode": "data:image/png;base64,...",
    "clickCount": 42,
    "expiryDate": "2025-12-31T23:59:59Z",
    "updatedAt": "2024-06-04T16:00:00Z"
  }
}
```

**Used By:** EditUrlModal
**Called Via:** `useData().updateUrl(id, urlData)`
**Side Effects:**
- Updated URL replaces old one in state
- refreshTrigger incremented
- All components notified

---

### 4. Delete URL
**Endpoint:** `DELETE /url/:id`

**URL Params:**
- `id`: The URL ID to delete

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response (Success):**
```json
{
  "message": "URL deleted successfully"
}
```

**Used By:** DeleteModal
**Called Via:** `useData().deleteUrl(id)`
**Side Effects:**
- URL removed from state
- Analytics for URL removed
- refreshTrigger incremented
- All components notified

---

### 5. Bulk Upload URLs
**Endpoint:** `POST /url/bulk-upload`

**Request Format:** `multipart/form-data`

**Form Data:**
- `file`: CSV file with columns: originalUrl, customAlias (optional)

**CSV Format Example:**
```
originalUrl,customAlias
https://example1.com,link1
https://example2.com,link2
https://example3.com,
```

**Response (Success):**
```json
{
  "message": "Bulk upload successful",
  "uploadedCount": 3,
  "failedCount": 0,
  "results": [
    {
      "originalUrl": "https://example1.com",
      "customAlias": "link1",
      "status": "success",
      "shortUrl": "http://short.url/abc"
    },
    ...
  ]
}
```

**Used By:** Bulk Upload page
**Called Via:** `useData().bulkUploadUrls(file)`
**Side Effects:**
- All URLs re-fetched
- bulkUploadProgress tracks progress
- refreshTrigger incremented
- All components notified

---

## Analytics Endpoints

### 1. Get Analytics for URL
**Endpoint:** `GET /analytics/:urlId`

**URL Params:**
- `urlId`: The URL ID to get analytics for

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response (Success):**
```json
{
  "_id": "analyticsId",
  "urlId": "urlId",
  "clicks": 42,
  "uniqueClicks": 38,
  "clicksByDate": [
    {
      "date": "2024-06-01",
      "clicks": 5
    },
    {
      "date": "2024-06-02",
      "clicks": 8
    },
    ...
  ],
  "clicksByCountry": [
    {
      "country": "United States",
      "clicks": 25
    },
    {
      "country": "United Kingdom",
      "clicks": 10
    },
    ...
  ],
  "clicksByDevice": {
    "desktop": 30,
    "mobile": 12,
    "tablet": 0
  },
  "referrers": [
    {
      "referrer": "google.com",
      "clicks": 15
    },
    {
      "referrer": "twitter.com",
      "clicks": 8
    },
    ...
  ]
}
```

**Used By:** Analytics page, AnalyticsChart component
**Called Via:** `useData().fetchAnalytics(urlId)`
**Auto-Called:** When data refreshes (via refreshTrigger)

---

## Response Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Parse response.json() |
| 201 | Created | Parse response.json() |
| 400 | Bad Request | Show error message |
| 401 | Unauthorized | Clear token, redirect to login |
| 403 | Forbidden | Show "access denied" error |
| 404 | Not Found | Show "resource not found" error |
| 500 | Server Error | Show "server error" message |

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

**Always display `message` to user:**
```javascript
toast.error(error.message || "An error occurred");
```

---

## Rate Limiting

**Note:** No rate limiting info provided. Monitor response headers for rate limit info.

---

## Token Expiration

If you get a 401 error:
1. The JWT token has expired
2. User needs to login again
3. Clear token from localStorage
4. Redirect to login page

This is handled in AuthContext automatically.

---

## Testing Endpoints with curl

### Create URL
```bash
curl -X POST https://url-short-caxa.onrender.com/api/url/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "originalUrl": "https://example.com",
    "customAlias": "test"
  }'
```

### Get All URLs
```bash
curl -X GET https://url-short-caxa.onrender.com/api/url/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Analytics
```bash
curl -X GET https://url-short-caxa.onrender.com/api/analytics/URL_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Frontend Integration

### Using DataContext.apiCall()
```javascript
// Instead of fetch, use:
const result = await apiCall("/url/create", {
  method: "POST",
  body: JSON.stringify(data)
});

// Benefits:
// - Auto JWT injection
// - Consistent error handling
// - Proper headers
// - Logging
```

---

## Database Models (Reference)

### URL Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  originalUrl: String,
  shortUrl: String,
  customAlias: String,
  qrCode: String (base64),
  clickCount: Number,
  expiryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Analytics Model
```javascript
{
  _id: ObjectId,
  urlId: ObjectId,
  clicks: Number,
  uniqueClicks: Number,
  clicksByDate: [{date, clicks}],
  clicksByCountry: [{country, clicks}],
  clicksByDevice: {desktop, mobile, tablet},
  referrers: [{referrer, clicks}]
}
```

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Debugging Tips

### Check Response in DevTools
1. Open Chrome DevTools
2. Go to Network tab
3. Perform an action
4. Click on API request
5. Check Response tab

### Log API Calls
```javascript
// In DataContext.apiCall():
console.log("API Call:", endpoint, options);
console.log("Response:", data);
```

### Test with Postman
1. Import collection from backend repo
2. Set Authorization header with JWT
3. Test each endpoint manually
4. Verify request/response formats

---

## Common Issues & Solutions

### 401 Unauthorized
**Cause:** Invalid or expired JWT token
**Solution:** 
- Clear localStorage
- Login again
- Fresh token will be generated

### 400 Bad Request
**Cause:** Invalid request body format
**Solution:**
- Check field names match API docs
- Verify data types
- Check for required fields

### 500 Server Error
**Cause:** Backend issue
**Solution:**
- Check backend logs
- Try again later
- Contact backend team

### CORS Error
**Cause:** Frontend and backend on different origins
**Solution:**
- Backend should have CORS enabled
- Verify Access-Control-Allow-Origin header
- Usually handled by backend

---

**Last Updated**: June 4, 2026
**Status**: Production Ready
