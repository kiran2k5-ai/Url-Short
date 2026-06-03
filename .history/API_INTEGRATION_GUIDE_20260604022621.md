# API Integration & Testing Guide

## Overview
This guide helps you test all frontend-backend API endpoints for the URL Shortener application.

## Backend Base URL
```
https://url-short-caxa.onrender.com/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

The token is stored in `localStorage.token` after successful login.

---

## 1. Authentication Endpoints

### 1.1 User Signup
**Endpoint:** `POST /auth/signup`

**Request:**
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGc..."
}
```

**Test Command:**
```javascript
// In browser console:
const response = await fetch('https://url-short-caxa.onrender.com/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'TestPassword123'
  })
});
console.log(await response.json());
```

---

### 1.2 User Login
**Endpoint:** `POST /auth/login`

**Request:**
```javascript
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGc..."
}
```

**Test Command:**
```javascript
const response = await fetch('https://url-short-caxa.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'TestPassword123'
  })
});
const data = await response.json();
console.log(data);
localStorage.setItem('token', data.token); // Save for future requests
```

---

## 2. URL Management Endpoints

### 2.1 Create Short URL
**Endpoint:** `POST /url/create`
**Authentication:** Required ✓

**Request:**
```javascript
{
  "originalUrl": "https://www.example.com/very/long/url",
  "customCode": "mylink",  // optional
  "expiryDays": 30,        // optional
  "description": "My awesome link"  // optional
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "URL created successfully",
  "data": {
    "_id": "url_id",
    "originalUrl": "https://www.example.com/very/long/url",
    "shortCode": "mylink",
    "shortUrl": "https://url-short-caxa.onrender.com/mylink",
    "clickCount": 0,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "expiresAt": "2024-02-14T10:30:00.000Z"
  }
}
```

**Test Command:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('https://url-short-caxa.onrender.com/api/url/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    originalUrl: 'https://www.example.com/test',
    customCode: `test-${Date.now()}`,
    expiryDays: 30
  })
});
console.log(await response.json());
```

---

### 2.2 Get All URLs
**Endpoint:** `GET /url/all`
**Authentication:** Required ✓

**Response:**
```javascript
{
  "success": true,
  "message": "URLs fetched successfully",
  "data": [
    {
      "_id": "url_id_1",
      "originalUrl": "https://example.com/1",
      "shortCode": "abc123",
      "shortUrl": "https://url-short-caxa.onrender.com/abc123",
      "clickCount": 5,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "expiresAt": "2024-02-14T10:30:00.000Z"
    },
    // ... more URLs
  ]
}
```

**Test Command:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('https://url-short-caxa.onrender.com/api/url/all', {
  headers: { 'Authorization': `Bearer ${token}` }
});
console.log(await response.json());
```

---

### 2.3 Update URL
**Endpoint:** `PUT /url/{id}`
**Authentication:** Required ✓

**Request:**
```javascript
{
  "originalUrl": "https://new-url.com",  // optional
  "customCode": "newcode",                // optional
  "expiryDays": 60,                       // optional
  "description": "Updated description"    // optional
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "URL updated successfully",
  "data": { /* updated URL object */ }
}
```

**Test Command:**
```javascript
const token = localStorage.getItem('token');
const urlId = "your_url_id_here";
const response = await fetch(`https://url-short-caxa.onrender.com/api/url/${urlId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    customCode: `updated-${Date.now()}`
  })
});
console.log(await response.json());
```

---

### 2.4 Delete URL
**Endpoint:** `DELETE /url/{id}`
**Authentication:** Required ✓

**Response:**
```javascript
{
  "success": true,
  "message": "URL deleted successfully"
}
```

**Test Command:**
```javascript
const token = localStorage.getItem('token');
const urlId = "your_url_id_here";
const response = await fetch(`https://url-short-caxa.onrender.com/api/url/${urlId}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});
console.log(await response.json());
```

---

## 3. Analytics Endpoints

### 3.1 Get Analytics for a URL
**Endpoint:** `GET /analytics/{urlId}`
**Authentication:** Required ✓

**Response:**
```javascript
{
  "success": true,
  "message": "Analytics fetched successfully",
  "data": {
    "urlId": "url_id",
    "totalClicks": 42,
    "uniqueVisitors": 15,
    "lastVisited": "2024-01-20T14:30:00.000Z",
    "recentVisits": [
      {
        "_id": "visit_id",
        "browser": "Chrome",
        "device": "Desktop",
        "country": "United States",
        "city": "New York",
        "visitedAt": "2024-01-20T14:30:00.000Z"
      },
      // ... more visits
    ]
  }
}
```

**Test Command:**
```javascript
const token = localStorage.getItem('token');
const urlId = "your_url_id_here";
const response = await fetch(`https://url-short-caxa.onrender.com/api/analytics/${urlId}`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
console.log(await response.json());
```

---

## 4. Quick Testing Script

Copy and paste this into the browser console to test all APIs:

```javascript
// Save this as a bookmark or in DevTools snippets
async function testAllAPIs() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    return;
  }

  console.log('🚀 Starting API Tests...\n');

  // Test 1: Get all URLs
  console.log('Test 1: GET /url/all');
  let response = await fetch('https://url-short-caxa.onrender.com/api/url/all', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const urlsData = await response.json();
  console.log('✅ Response:', urlsData);
  console.log(`Found ${urlsData.data?.length || 0} URLs\n`);

  // Test 2: Create URL
  console.log('Test 2: POST /url/create');
  response = await fetch('https://url-short-caxa.onrender.com/api/url/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      originalUrl: 'https://example.com/test',
      customCode: `test-${Date.now()}`,
      expiryDays: 30
    })
  });
  const newUrl = await response.json();
  console.log('✅ Response:', newUrl);
  const urlId = newUrl.data?._id;

  // Test 3: Get Analytics
  if (urlsData.data?.length > 0) {
    console.log('\nTest 3: GET /analytics/{urlId}');
    const testUrlId = urlsData.data[0]._id;
    response = await fetch(`https://url-short-caxa.onrender.com/api/analytics/${testUrlId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const analytics = await response.json();
    console.log('✅ Response:', analytics);
  }

  console.log('\n✅ All tests completed!');
}

// Run the tests
testAllAPIs();
```

---

## 5. Common Issues & Solutions

### Issue: 401 Unauthorized
**Cause:** Missing or invalid token
**Solution:** 
1. Make sure you're logged in
2. Check that token is saved in `localStorage.token`
3. Use the correct token in Authorization header

### Issue: 404 Not Found
**Cause:** Wrong endpoint URL or missing URL ID
**Solution:**
1. Double-check the endpoint path
2. Verify the URL ID exists
3. Check the base URL is correct

### Issue: 400 Bad Request
**Cause:** Invalid request payload
**Solution:**
1. Verify all required fields are included
2. Check data types match (string, number, etc.)
3. Ensure URL is properly encoded

### Issue: 500 Internal Server Error
**Cause:** Backend error
**Solution:**
1. Check backend is running
2. Check internet connection
3. Try again after a moment

---

## 6. Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Backend error |

---

## 7. Testing Checklist

- [ ] Can signup new user
- [ ] Can login with credentials
- [ ] Token is saved to localStorage
- [ ] Can create new short URL
- [ ] Can retrieve all URLs
- [ ] Can update existing URL
- [ ] Can delete URL
- [ ] Can fetch analytics for URL
- [ ] All buttons in Links table work
- [ ] QR code preview modal displays correctly
- [ ] QR code can be downloaded
- [ ] All error messages display properly

---

## Need Help?

For debugging:
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Perform the action you want to test
4. Check the request and response in the Network tab
5. Look at Status code and response body

For API documentation, check the backend code in:
`url-shortener-backend/src/routes/`
