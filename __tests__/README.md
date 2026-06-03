# 🧪 LinkNest API Testing Guide

## Overview
This folder contains comprehensive tests to verify that the frontend and backend are correctly communicating via API endpoints.

## Test Files

### 1. `api/endpoints.test.js`
Complete test suite for all API endpoints including:
- **Authentication**: Signup, Login
- **URL Management**: Create, Read (All), Update, Delete
- **Analytics**: Fetch analytics for URLs

### 2. `integration/responsiveness.test.js`
Tests for responsive design across all devices and screen sizes.

## How to Run Tests

### Option 1: Run in Node.js (Backend Tests)
```bash
# From the test folder
node api/endpoints.test.js

# Or from the root directory
node __tests__/api/endpoints.test.js
```

### Option 2: Run in Browser Console (Frontend Tests)
1. Open your browser Dev Tools (F12)
2. Go to Console tab
3. Copy and paste the code from `api/endpoints.test.js`
4. Call the test function:
   ```javascript
   runAllTests();
   ```

### Option 3: Create Test Script
```bash
# Save as test-api.sh
#!/bin/bash
node __tests__/api/endpoints.test.js
```

Then run:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Test Checklist

### Authentication
- [ ] Signup creates new user
- [ ] Login returns valid token
- [ ] Token can be used for authenticated requests
- [ ] Invalid credentials rejected

### URL Management
- [ ] Create URL generates short code
- [ ] Create URL generates QR code
- [ ] Fetch all URLs returns user's URLs only
- [ ] Update URL changes original URL
- [ ] Delete URL removes from database
- [ ] Can't access other user's URLs

### Analytics
- [ ] Fetch analytics returns click count
- [ ] Recent visits tracked with browser info
- [ ] Geolocation captured correctly
- [ ] Device type detected

## Testing Locally

### 1. Start Backend
```bash
cd url-shortener-backend
npm run dev
# Backend runs on http://localhost:5000
```

### 2. Update Test Base URL
In `endpoints.test.js`, change:
```javascript
// FROM:
const BASE_URL = "https://url-short-caxa.onrender.com/api";

// TO:
const BASE_URL = "http://localhost:5000/api";
```

### 3. Run Tests
```bash
node __tests__/api/endpoints.test.js
```

## Testing Production

Tests are configured to use the deployed backend:
```
https://url-short-caxa.onrender.com/api
```

To test production:
```bash
node __tests__/api/endpoints.test.js
```

## Expected Output

### Successful Test Run
```
🚀 LinkNest - API Integration Test Suite
=========================================

🔐 Testing Authentication API...

📝 Testing POST /api/auth/signup
✅ PASS - Signup successful
Response: { user: {...}, message: "..." }

📝 Testing POST /api/auth/login
✅ PASS - Login successful
Token stored: eyJhbGciOiJIUzI1...

🔗 Testing URL Management API...

📝 Testing POST /api/url/create
✅ PASS - URL created successfully
Short URL: https://url-short-caxa.onrender.com/abc123
Custom Alias: test-link-1234567890

...

✅ Test suite completed!

📊 Summary:
  ✓ Authentication (Signup/Login)
  ✓ URL Management (Create/Read/Update/Delete)
  ✓ Analytics Tracking

✨ All API endpoints working correctly!
```

### Failed Test Run
```
❌ FAIL - Login failed
Error: { message: "Invalid credentials" }

❌ ERROR - Get URLs request failed
Error: Network timeout
```

## Troubleshooting

### CORS Errors
- Backend must have CORS enabled: `app.use(cors())`
- Check that frontend URL is allowed in CORS config

### 401 Unauthorized
- Token not being sent in headers
- Token expired or invalid
- Check `Authorization: Bearer ${token}` header format

### Connection Refused
- Backend not running
- Check backend is on `http://localhost:5000`
- Verify BASE_URL in test file

### Invalid Credentials
- Wrong email/password in login test
- User doesn't exist in database
- Database connection failed

## API Endpoints Reference

### Authentication
```
POST /api/auth/signup
POST /api/auth/login
```

### URL Operations
```
POST   /api/url/create
GET    /api/url/all
PUT    /api/url/:id
DELETE /api/url/:id
POST   /api/url/bulk-upload
GET    /api/url/:shortCode
```

### Analytics
```
GET /api/analytics/:urlId
```

## Next Steps

- [ ] Run tests against local backend
- [ ] Run tests against production backend
- [ ] Test with different user accounts
- [ ] Test URL expiry functionality
- [ ] Test bulk upload feature
- [ ] Test QR code generation
- [ ] Load test with multiple URLs
- [ ] Test error scenarios

---

**Note**: Tests create real data in the database. Use test accounts and clean up after testing.
