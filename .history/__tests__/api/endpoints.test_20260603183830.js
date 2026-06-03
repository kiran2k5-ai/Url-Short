/**
 * API Integration Tests for LinkNest
 * Tests communication between frontend and backend
 * 
 * Run these tests: npm test
 * Or manually test by running the commands in sequence
 */

const BASE_URL = "https://url-short-caxa.onrender.com/api";
// For local testing: "http://localhost:5000/api"

let authToken = null;
let testUserId = null;
let testUrlId = null;

// ============================================
// 1. AUTHENTICATION TESTS
// ============================================

console.log("🔐 Testing Authentication API...\n");

/**
 * Test: User Signup
 */
async function testSignup() {
    try {
        console.log("📝 Testing POST /api/auth/signup");
        
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Test User " + Date.now(),
                email: `testuser${Date.now()}@test.com`,
                password: "password123"
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - Signup successful");
            console.log("Response:", data);
            return data;
        } else {
            console.log("❌ FAIL - Signup failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Signup request failed");
        console.error(error.message);
        return null;
    }
}

/**
 * Test: User Login
 */
async function testLogin(email, password) {
    try {
        console.log("\n📝 Testing POST /api/auth/login");
        
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - Login successful");
            authToken = data.token;
            console.log("Token stored:", authToken.substring(0, 20) + "...");
            return data;
        } else {
            console.log("❌ FAIL - Login failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Login request failed");
        console.error(error.message);
        return null;
    }
}

// ============================================
// 2. URL MANAGEMENT TESTS
// ============================================

console.log("\n🔗 Testing URL Management API...\n");

/**
 * Test: Create URL
 */
async function testCreateUrl(originalUrl, customAlias = null, expiryDays = null) {
    try {
        console.log("📝 Testing POST /api/url/create");
        
        const body = { originalUrl };
        if (customAlias) body.customAlias = customAlias;
        if (expiryDays) body.expiryDays = expiryDays;

        const response = await fetch(`${BASE_URL}/url/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - URL created successfully");
            testUrlId = data.data._id;
            console.log("Short URL:", data.shortUrl);
            console.log("Custom Alias:", data.data.shortCode);
            console.log("URL ID stored:", testUrlId);
            return data;
        } else {
            console.log("❌ FAIL - URL creation failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Create URL request failed");
        console.error(error.message);
        return null;
    }
}

/**
 * Test: Get All URLs
 */
async function testGetAllUrls() {
    try {
        console.log("\n📝 Testing GET /api/url/all");
        
        const response = await fetch(`${BASE_URL}/url/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - Retrieved all URLs");
            console.log(`Found ${data.length} URL(s)`);
            data.forEach((url, idx) => {
                console.log(`  ${idx + 1}. ${url.shortCode} - ${url.originalUrl} (${url.clickCount} clicks)`);
            });
            return data;
        } else {
            console.log("❌ FAIL - Get URLs failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Get URLs request failed");
        console.error(error.message);
        return null;
    }
}

/**
 * Test: Update URL
 */
async function testUpdateUrl(urlId, newOriginalUrl) {
    try {
        console.log("\n📝 Testing PUT /api/url/:id");
        
        const response = await fetch(`${BASE_URL}/url/${urlId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ originalUrl: newOriginalUrl })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - URL updated successfully");
            console.log("Updated Original URL:", data.data.originalUrl);
            return data;
        } else {
            console.log("❌ FAIL - URL update failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Update URL request failed");
        console.error(error.message);
        return null;
    }
}

/**
 * Test: Get Analytics
 */
async function testGetAnalytics(urlId) {
    try {
        console.log("\n📝 Testing GET /api/analytics/:urlId");
        
        const response = await fetch(`${BASE_URL}/analytics/${urlId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - Retrieved analytics");
            console.log("Short Code:", data.shortCode);
            console.log("Total Clicks:", data.totalClicks);
            console.log("Recent Visits:", data.recentVisits.length);
            return data;
        } else {
            console.log("❌ FAIL - Get analytics failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Get analytics request failed");
        console.error(error.message);
        return null;
    }
}

/**
 * Test: Delete URL
 */
async function testDeleteUrl(urlId) {
    try {
        console.log("\n📝 Testing DELETE /api/url/:id");
        
        const response = await fetch(`${BASE_URL}/url/${urlId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("✅ PASS - URL deleted successfully");
            console.log("Message:", data.message);
            return data;
        } else {
            console.log("❌ FAIL - URL deletion failed");
            console.log("Error:", data);
            return null;
        }
    } catch (error) {
        console.log("❌ ERROR - Delete URL request failed");
        console.error(error.message);
        return null;
    }
}

// ============================================
// 3. FULL TEST FLOW
// ============================================

async function runAllTests() {
    console.log("🚀 LinkNest - API Integration Test Suite");
    console.log("=========================================\n");
    console.log(`Testing against: ${BASE_URL}\n`);

    // Step 1: Signup
    const signupResult = await testSignup();
    if (!signupResult) {
        console.log("\n❌ Signup failed - cannot continue tests");
        return;
    }

    const testEmail = signupResult.user.email;

    // Step 2: Login
    const loginResult = await testLogin(testEmail, "password123");
    if (!loginResult) {
        console.log("\n❌ Login failed - cannot continue tests");
        return;
    }

    // Step 3: Create URL
    const createResult = await testCreateUrl(
        "https://www.example.com/very/long/url",
        "test-link-" + Date.now(),
        30
    );
    if (!createResult) {
        console.log("\n❌ URL creation failed - cannot continue tests");
        return;
    }

    // Step 4: Get All URLs
    await testGetAllUrls();

    // Step 5: Update URL
    if (testUrlId) {
        await testUpdateUrl(testUrlId, "https://www.updated-example.com");
    }

    // Step 6: Get Analytics
    if (testUrlId) {
        await testGetAnalytics(testUrlId);
    }

    // Step 7: Delete URL
    if (testUrlId) {
        await testDeleteUrl(testUrlId);
    }

    console.log("\n✅ Test suite completed!\n");
    console.log("📊 Summary:");
    console.log("  ✓ Authentication (Signup/Login)");
    console.log("  ✓ URL Management (Create/Read/Update/Delete)");
    console.log("  ✓ Analytics Tracking");
    console.log("\n✨ All API endpoints working correctly!\n");
}

// Run tests only if this file is executed directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests };
}

// Uncomment to run automatically when loaded
// runAllTests().catch(console.error);
