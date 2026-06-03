# LinkNest - Complete Testing & Verification Guide

## 🎯 Quick Start (5 minutes)

### Step 1: Start the Development Server
```bash
cd url-shortener-frontend
npm run dev
```
Expected output:
```
  VITE v8.0.16  ready in 1234 ms
  ➜  Local:   http://localhost:5177/
```

### Step 2: Open in Browser
Navigate to: **http://localhost:5177/**

### Step 3: Login or Signup
- Create a new account or login with existing credentials
- You'll be redirected to the Dashboard

---

## 📋 Testing Checklist

### ✅ Authentication Tests
- [ ] Sign up with new email
- [ ] Verify email validation works
- [ ] Login with correct credentials
- [ ] Logout and verify redirect
- [ ] Token persists in localStorage

### ✅ Dashboard Tests
- [ ] Dashboard loads with stats
- [ ] Navigation menu appears
- [ ] All menu items are clickable
- [ ] Page transitions work smoothly

### ✅ Links Page Tests
- [ ] Table displays all URLs
- [ ] Copy button copies short URL
- [ ] QR icon shows QR preview modal
- [ ] Download button downloads QR code
- [ ] Analytics button shows stats
- [ ] Edit button opens edit modal
- [ ] Delete button removes URL
- [ ] Empty state shows when no URLs

### ✅ Analytics Page Tests
- [ ] Overall stats display (Total Clicks, Active Links, Avg Clicks, Top Performer)
- [ ] URL selector dropdown works
- [ ] Selected URL shows detailed analytics
- [ ] Recent visits display with browser/device info
- [ ] Trends and insights show correctly

### ✅ QR Code Page Tests
- [ ] QR codes display for all URLs
- [ ] Download button works
- [ ] Copy link button works
- [ ] Grid layout is responsive
- [ ] Loading state shows while generating

### ✅ Bulk Upload Tests
- [ ] Can download CSV template
- [ ] CSV upload area accepts files
- [ ] CSV parsing works correctly
- [ ] Results show success/failure counts
- [ ] Error handling displays per-row errors
- [ ] Successfully created links appear in Links page

### ✅ Domains Page Tests
- [ ] Can add new custom domain
- [ ] Set default domain works
- [ ] Cannot delete default domain
- [ ] Domain status shows correctly
- [ ] DNS setup guide displays

### ✅ Notifications Page Tests
- [ ] Notifications display with correct types
- [ ] Filtering by "All", "Unread", "Success", etc. works
- [ ] Unread count badge displays
- [ ] Can mark as read/delete notifications

---

## 🔬 Browser-Based API Testing

### Method 1: Automated Testing Script

**Step 1:** Login to the application

**Step 2:** Open DevTools
- Press `F12` or right-click → Inspect

**Step 3:** Go to Console tab

**Step 4:** Copy and paste this command:
```javascript
fetch("https://raw.githubusercontent.com/your-repo/main/src/utils/browserAPITester.js")
  .then(r => r.text())
  .then(code => eval(code));
```

Or directly paste the entire browserAPITester.js code from `src/utils/browserAPITester.js`

**Step 5:** Run tests
```javascript
APITester.runAllTests()
```

### Method 2: Manual API Testing

In browser console, test individual endpoints:

**Get All URLs:**
```javascript
const token = localStorage.getItem('token');
fetch('https://url-short-caxa.onrender.com/api/url/all', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(d => console.log(d));
```

**Create URL:**
```javascript
const token = localStorage.getItem('token');
fetch('https://url-short-caxa.onrender.com/api/url/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    originalUrl: 'https://example.com',
    expiryDays: 30
  })
}).then(r => r.json()).then(d => console.log(d));
```

---

## 🔍 Browser Network Tab Inspection

### How to verify API calls are working:

**Step 1:** Open DevTools → Network tab

**Step 2:** Filter by XHR (XMLHttpRequest)

**Step 3:** Perform an action (e.g., create a URL)

**Step 4:** Check in Network tab:
- Request shows `POST /url/create`
- Status should be `201` (Created) or `200` (OK)
- Response shows created URL object
- Authorization header includes token

**Expected Response for Create URL:**
```json
{
  "success": true,
  "message": "URL created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "originalUrl": "https://example.com",
    "shortCode": "abc123",
    "shortUrl": "https://url-short-caxa.onrender.com/abc123",
    "clickCount": 0,
    "createdAt": "2024-01-20T10:30:00.000Z"
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Pages don't load after login
**Solution:**
1. Check browser console for errors (F12)
2. Clear localStorage: `localStorage.clear()`
3. Refresh page
4. Login again

### Issue: QR codes not displaying
**Solution:**
1. Check Network tab for 404 errors on QR API
2. QR Server API should return image successfully
3. Verify internet connection is working

### Issue: Bulk upload fails
**Solution:**
1. Verify CSV format has required "Original URL" column
2. Check URLs are valid (start with https://)
3. Ensure custom codes don't already exist
4. Check file is actually CSV format

### Issue: Analytics not loading
**Solution:**
1. Verify URL has been created successfully
2. Wait a few seconds for backend to process
3. Refresh page to see updated data
4. Check backend is running on Render

### Issue: 401 Unauthorized errors
**Solution:**
1. Token may have expired - logout and login again
2. Check localStorage has 'token' key
3. Verify Authorization header is set in API calls

---

## 📊 Test Results Log

Document test results here:

| Test | Status | Notes | Date |
|------|--------|-------|------|
| Auth Login | ✅ PASS | User signup works | 2024-01-20 |
| Create URL | ✅ PASS | New URLs created | 2024-01-20 |
| Get Analytics | ✅ PASS | Analytics API responds | 2024-01-20 |
| QR Display | ✅ PASS | QR codes render | 2024-01-20 |
| Bulk Upload | ✅ PASS | CSV import works | 2024-01-20 |

---

## 🎨 UI/UX Verification

### Desktop (1920x1080+)
- [ ] Sidebar navigation visible
- [ ] All pages render correctly
- [ ] Modals display properly
- [ ] Tables are readable
- [ ] Buttons are clickable

### Tablet (768x1024)
- [ ] Layout adapts to tablet size
- [ ] Sidebar collapses or switches to hamburger
- [ ] Touch-friendly button sizes
- [ ] Forms are usable

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] Content stacks vertically
- [ ] Tables become cards if needed
- [ ] Forms are input-friendly

---

## 🚀 Performance Checks

### Build Size
```
Current: 864.66 kB minified (262.14 kB gzipped)
Target: < 1 MB minified
Status: ✅ PASS
```

### Page Load Time
- Dashboard: < 2s
- Analytics: < 2s
- Links: < 1s
- QR Code: < 1s

### DevTools - Lighthouse
Target scores:
- Performance: > 70
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 📝 Test Report Template

```
## Test Session Report
Date: ____/____/______
Tester: _________________

### Tests Passed: ___ / ___

### Issues Found:
1. [Issue description]
   - Severity: [High/Medium/Low]
   - Steps to reproduce: [...]
   - Expected: [...]
   - Actual: [...]

### Recommendations:
- [Improvement 1]
- [Improvement 2]

### Sign-off:
Approved for production: [ ] Yes [ ] No
Tester signature: _______________
```

---

## 📚 API Reference Summary

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| /auth/signup | POST | No | Register new user |
| /auth/login | POST | No | User login |
| /url/all | GET | Yes | Get all user's URLs |
| /url/create | POST | Yes | Create new short URL |
| /url/{id} | PUT | Yes | Update URL |
| /url/{id} | DELETE | Yes | Delete URL |
| /analytics/{id} | GET | Yes | Get URL analytics |

---

## ✅ Final Verification Checklist

- [ ] Frontend builds without errors
- [ ] All pages load successfully
- [ ] All APIs respond correctly
- [ ] QR codes display and download
- [ ] Bulk upload processes CSV files
- [ ] Responsive design works on all devices
- [ ] No console errors or warnings
- [ ] Authentication persists correctly
- [ ] Error handling displays messages
- [ ] Performance is acceptable

---

## 🎉 You're Ready!

If all tests pass:
1. ✅ Frontend is production-ready
2. ✅ APIs are working correctly
3. ✅ UI/UX is polished and responsive
4. ✅ All features are functional

For any issues, check the troubleshooting section or contact support.

---

**Last Updated:** 2024-01-20  
**Status:** ✅ Ready for Testing  
**Version:** 1.0.0
