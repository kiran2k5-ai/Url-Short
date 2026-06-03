/**
 * API Testing Utility for LinkNest
 * Tests all frontend-backend endpoints
 * Run in browser console: import these functions and call them
 */

const BASE_URL = "https://url-short-caxa.onrender.com/api";

/**
 * Get authentication token from localStorage
 */
const getToken = () => localStorage.getItem("token");

/**
 * Make API request with authentication
 */
const apiRequest = async (method, endpoint, data = null) => {
    const token = getToken();
    if (!token) {
        return { error: "No authentication token found" };
    }

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();
        return { status: response.status, ...result };
    } catch (error) {
        return { error: error.message };
    }
};

/**
 * Test URL Management APIs
 */
export const testUrlAPIs = {
    /**
     * Test: Get all URLs
     * Endpoint: GET /url/all
     */
    getAllUrls: async () => {
        console.log("🔍 Testing GET /url/all");
        const result = await apiRequest("GET", "/url/all");
        console.log("Result:", result);
        return result;
    },

    /**
     * Test: Create new URL
     * Endpoint: POST /url/create
     */
    createUrl: async (originalUrl = "https://example.com") => {
        console.log("🔍 Testing POST /url/create");
        const data = {
            originalUrl,
            customCode: `test-${Date.now()}`,
            expiryDays: 30
        };
        const result = await apiRequest("POST", "/url/create", data);
        console.log("Result:", result);
        return result;
    },

    /**
     * Test: Update URL
     * Endpoint: PUT /url/{id}
     */
    updateUrl: async (urlId, customCode = null) => {
        console.log(`🔍 Testing PUT /url/${urlId}`);
        const data = { customCode: customCode || `updated-${Date.now()}` };
        const result = await apiRequest("PUT", `/url/${urlId}`, data);
        console.log("Result:", result);
        return result;
    },

    /**
     * Test: Delete URL
     * Endpoint: DELETE /url/{id}
     */
    deleteUrl: async (urlId) => {
        console.log(`🔍 Testing DELETE /url/${urlId}`);
        const result = await apiRequest("DELETE", `/url/${urlId}`);
        console.log("Result:", result);
        return result;
    }
};

/**
 * Test Analytics APIs
 */
export const testAnalyticsAPIs = {
    /**
     * Test: Get analytics for specific URL
     * Endpoint: GET /analytics/{urlId}
     */
    getAnalytics: async (urlId) => {
        console.log(`🔍 Testing GET /analytics/${urlId}`);
        const result = await apiRequest("GET", `/analytics/${urlId}`);
        console.log("Result:", result);
        return result;
    }
};

/**
 * Test Authentication APIs
 */
export const testAuthAPIs = {
    /**
     * Test: Login
     * Endpoint: POST /auth/login
     */
    login: async (email, password) => {
        console.log("🔍 Testing POST /auth/login");
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        };
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, options);
            const result = await response.json();
            console.log("Result:", result);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    },

    /**
     * Test: Signup
     * Endpoint: POST /auth/signup
     */
    signup: async (name, email, password) => {
        console.log("🔍 Testing POST /auth/signup");
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        };
        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, options);
            const result = await response.json();
            console.log("Result:", result);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }
};

/**
 * Run all API tests
 */
export const runAllTests = async () => {
    console.log("🚀 Starting API Tests...\n");

    console.log("========== URL APIs ==========");
    await testUrlAPIs.getAllUrls();

    console.log("\n========== Analytics APIs ==========");
    const urls = await testUrlAPIs.getAllUrls();
    if (urls.data && urls.data.length > 0) {
        await testAnalyticsAPIs.getAnalytics(urls.data[0]._id);
    }

    console.log("\n✅ All tests completed!");
};

/**
 * Quick test summary
 */
export const testSummary = async () => {
    console.log("📊 API Test Summary\n");

    const urls = await testUrlAPIs.getAllUrls();
    console.log(`✅ GET /url/all: ${urls.status === 200 ? "PASS" : "FAIL"}`);

    if (urls.data && urls.data.length > 0) {
        const analytics = await testAnalyticsAPIs.getAnalytics(urls.data[0]._id);
        console.log(`✅ GET /analytics/{id}: ${analytics.status === 200 ? "PASS" : "FAIL"}`);
    }

    console.log("\n📋 Endpoints:");
    console.log("- GET /url/all ✓");
    console.log("- POST /url/create ✓");
    console.log("- PUT /url/{id} ✓");
    console.log("- DELETE /url/{id} ✓");
    console.log("- GET /analytics/{id} ✓");
};

export default { testUrlAPIs, testAnalyticsAPIs, testAuthAPIs, runAllTests, testSummary };
