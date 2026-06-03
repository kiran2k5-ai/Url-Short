/**
 * LinkNest - Browser API Testing Tool
 * Copy and paste this entire script into browser console (F12) to test all APIs
 * 
 * Usage:
 * 1. Open application and login
 * 2. Press F12 to open DevTools
 * 3. Go to Console tab
 * 4. Copy and paste this entire script
 * 5. Run: APITester.runAllTests()
 */

window.APITester = {
  BASE_URL: "https://url-short-caxa.onrender.com/api",

  /**
   * Get authentication token
   */
  getToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No authentication token found. Please login first.");
      return null;
    }
    return token;
  },

  /**
   * Make HTTP request with error handling
   */
  async request(method, endpoint, data = null) {
    const token = this.getToken();
    if (!token) return { error: "Not authenticated" };

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };

    if (data) options.body = JSON.stringify(data);

    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, options);
      const result = await response.json();
      return { status: response.status, ok: response.ok, ...result };
    } catch (error) {
      return { error: error.message };
    }
  },

  /**
   * Test: Get all URLs
   */
  async testGetAllUrls() {
    console.log("\n📋 TEST 1: Get All URLs (GET /url/all)");
    console.log("━".repeat(50));
    
    const result = await this.request("GET", "/url/all");
    
    if (result.ok) {
      console.log("✅ Status: ", result.status);
      console.log("✅ Count: ", result.data?.length || 0, "URLs");
      if (result.data?.length > 0) {
        console.log("✅ Sample URL:", {
          code: result.data[0].shortCode,
          clicks: result.data[0].clickCount,
          created: new Date(result.data[0].createdAt).toLocaleString()
        });
      }
    } else {
      console.error("❌ Failed:", result.message);
    }
    
    return result;
  },

  /**
   * Test: Create new URL
   */
  async testCreateUrl(originalUrl = "https://example.com/test-api") {
    console.log("\n📝 TEST 2: Create URL (POST /url/create)");
    console.log("━".repeat(50));
    
    const payload = {
      originalUrl,
      customCode: `test-${Date.now()}`,
      expiryDays: 30
    };

    console.log("Request payload:", payload);
    
    const result = await this.request("POST", "/url/create", payload);
    
    if (result.ok) {
      console.log("✅ Status: ", result.status);
      console.log("✅ Created URL:", {
        code: result.data?.shortCode,
        shortUrl: result.data?.shortUrl,
        message: result.message
      });
    } else {
      console.error("❌ Failed:", result.message);
    }
    
    return result;
  },

  /**
   * Test: Update URL
   */
  async testUpdateUrl(urlId, newCode) {
    console.log("\n✏️  TEST 3: Update URL (PUT /url/{id})");
    console.log("━".repeat(50));
    
    if (!urlId) {
      console.warn("⚠️  URL ID required. Fetching first URL...");
      const urls = await this.request("GET", "/url/all");
      if (!urls.data?.length) {
        console.error("❌ No URLs found to update");
        return;
      }
      urlId = urls.data[0]._id;
    }

    const payload = { customCode: newCode || `updated-${Date.now()}` };
    console.log("Request payload:", payload);
    
    const result = await this.request("PUT", `/url/${urlId}`, payload);
    
    if (result.ok) {
      console.log("✅ Status: ", result.status);
      console.log("✅ Updated URL:", { code: result.data?.shortCode });
    } else {
      console.error("❌ Failed:", result.message);
    }
    
    return result;
  },

  /**
   * Test: Delete URL
   */
  async testDeleteUrl(urlId) {
    console.log("\n🗑️  TEST 4: Delete URL (DELETE /url/{id})");
    console.log("━".repeat(50));
    
    if (!urlId) {
      console.warn("⚠️  URL ID required. Creating one first...");
      const created = await this.testCreateUrl();
      if (!created.data?._id) {
        console.error("❌ Could not create URL to delete");
        return;
      }
      urlId = created.data._id;
    }

    console.log("Deleting URL:", urlId);
    
    const result = await this.request("DELETE", `/url/${urlId}`);
    
    if (result.ok) {
      console.log("✅ Status: ", result.status);
      console.log("✅ Deleted successfully");
    } else {
      console.error("❌ Failed:", result.message);
    }
    
    return result;
  },

  /**
   * Test: Get Analytics
   */
  async testGetAnalytics(urlId) {
    console.log("\n📊 TEST 5: Get Analytics (GET /analytics/{id})");
    console.log("━".repeat(50));
    
    if (!urlId) {
      console.warn("⚠️  URL ID required. Fetching first URL...");
      const urls = await this.request("GET", "/url/all");
      if (!urls.data?.length) {
        console.warn("⚠️  No URLs found. Creating one...");
        const created = await this.testCreateUrl();
        urlId = created.data?._id;
      } else {
        urlId = urls.data[0]._id;
      }
    }

    if (!urlId) {
      console.error("❌ Could not get URL ID");
      return;
    }

    console.log("Fetching analytics for URL:", urlId);
    
    const result = await this.request("GET", `/analytics/${urlId}`);
    
    if (result.ok) {
      console.log("✅ Status: ", result.status);
      console.log("✅ Analytics:", {
        totalClicks: result.data?.totalClicks || 0,
        lastVisited: result.data?.lastVisited || "No visits",
        recentVisits: result.data?.recentVisits?.length || 0
      });
    } else {
      console.error("❌ Failed:", result.message);
    }
    
    return result;
  },

  /**
   * Check authentication
   */
  async checkAuth() {
    console.log("\n🔐 Checking Authentication");
    console.log("━".repeat(50));
    
    const token = localStorage.getItem("token");
    if (token) {
      console.log("✅ Token found in localStorage");
      console.log("Token (first 20 chars):", token.substring(0, 20) + "...");
    } else {
      console.error("❌ No token found. Please login first.");
    }
    
    return !!token;
  },

  /**
   * Get dashboard summary
   */
  async getDashboardSummary() {
    console.log("\n📈 Dashboard Summary");
    console.log("━".repeat(50));
    
    const urls = await this.request("GET", "/url/all");
    
    if (urls.ok && urls.data?.length > 0) {
      const totalClicks = urls.data.reduce((sum, url) => sum + (url.clickCount || 0), 0);
      const avgClicks = Math.round(totalClicks / urls.data.length);
      const topUrl = urls.data.reduce((max, url) => (url.clickCount || 0) > (max.clickCount || 0) ? url : max);

      console.log("Total URLs: ", urls.data.length);
      console.log("Total Clicks: ", totalClicks);
      console.log("Avg Clicks/Link: ", avgClicks);
      console.log("Top Performer: ", {
        code: topUrl.shortCode,
        clicks: topUrl.clickCount
      });
    } else {
      console.log("No data available");
    }
  },

  /**
   * Run all tests in sequence
   */
  async runAllTests() {
    console.clear();
    console.log("🚀 LinkNest API Test Suite");
    console.log("═".repeat(50));
    console.log("Starting comprehensive API testing...\n");

    // Check auth first
    const isAuthenticated = await this.checkAuth();
    if (!isAuthenticated) return;

    try {
      // Run all tests
      const urlsResult = await this.testGetAllUrls();
      const createdResult = await this.testCreateUrl();
      
      if (createdResult.data?._id) {
        await this.testUpdateUrl(createdResult.data._id, `test-updated-${Date.now()}`);
        await this.testGetAnalytics(createdResult.data._id);
      }

      await this.getDashboardSummary();

      console.log("\n" + "═".repeat(50));
      console.log("✅ All API tests completed!");
      console.log("\n📌 Next Steps:");
      console.log("1. Check if all tests passed (✅ status 200/201)");
      console.log("2. Open DevTools Network tab to see actual requests");
      console.log("3. Visit application pages to verify UI works");
      console.log("4. Report any ❌ failures to developers");
    } catch (error) {
      console.error("❌ Test suite error:", error);
    }
  },

  /**
   * Interactive API tester
   */
  interactive() {
    console.log("\n🎮 Interactive API Tester");
    console.log("Available commands:");
    console.log("- APITester.testGetAllUrls()");
    console.log("- APITester.testCreateUrl()");
    console.log("- APITester.testGetAnalytics()");
    console.log("- APITester.getDashboardSummary()");
    console.log("- APITester.runAllTests()");
    console.log("\nExample: APITester.testCreateUrl('https://github.com')");
  }
};

// Auto-run on load
console.log("%c🎯 API Tester Loaded! Type: APITester.runAllTests()", "color: green; font-size: 14px; font-weight: bold");
console.log("%cType APITester.interactive() for help", "color: blue");

// Export for use
window.APITester.interactive();
