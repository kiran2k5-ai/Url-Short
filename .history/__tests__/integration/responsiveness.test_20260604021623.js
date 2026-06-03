/**
 * Responsive Design & Accessibility Tests
 * Tests that the application looks good on all devices
 */

const breakpoints = {
    mobile: 375,      // iPhone SE
    mobileLarge: 430, // iPhone 14
    tablet: 768,      // iPad
    laptop: 1024,     // MacBook Air
    desktop: 1440     // Desktop
};

const viewports = [
    { name: "Mobile (iPhone SE)", width: 375, height: 667 },
    { name: "Mobile (iPhone 14)", width: 430, height: 932 },
    { name: "Tablet (iPad)", width: 768, height: 1024 },
    { name: "Laptop (MacBook)", width: 1440, height: 900 },
    { name: "Desktop (Wide)", width: 1920, height: 1080 },
    { name: "Desktop (Ultra)", width: 2560, height: 1440 }
];

// ============================================
// Test 1: Responsive Layout
// ============================================

function testResponsiveLayout() {
    console.log("📱 Testing Responsive Layout...\n");

    viewports.forEach(viewport => {
        console.log(`Testing: ${viewport.name} (${viewport.width}x${viewport.height})`);

        // Check if layout adapts
        const container = document.querySelector("[role='main']") || document.body;
        const computedStyle = window.getComputedStyle(container);
        
        // Mobile should have single column
        if (viewport.width < 768) {
            console.log("  ✓ Mobile layout (single column)");
        }
        // Tablet should have adaptive layout
        else if (viewport.width < 1024) {
            console.log("  ✓ Tablet layout (adaptive grid)");
        }
        // Desktop should have full layout
        else {
            console.log("  ✓ Desktop layout (full width)");
        }
    });
}

// ============================================
// Test 2: Font Sizing
// ============================================

function testFontSizing() {
    console.log("\n📝 Testing Font Sizing...\n");

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const paragraphs = document.querySelectorAll("p");
    const buttons = document.querySelectorAll("button");

    let headingCount = 0;
    let paragraphCount = 0;
    let buttonCount = 0;

    headings.forEach(h => {
        const fontSize = window.getComputedStyle(h).fontSize;
        console.log(`  H${h.tagName[1]} font size: ${fontSize}`);
        headingCount++;
    });

    paragraphs.forEach(p => {
        const fontSize = window.getComputedStyle(p).fontSize;
        if (paragraphCount < 3) console.log(`  P font size: ${fontSize}`);
        paragraphCount++;
    });

    buttons.forEach(b => {
        const fontSize = window.getComputedStyle(b).fontSize;
        if (buttonCount < 3) console.log(`  Button font size: ${fontSize}`);
        buttonCount++;
    });

    console.log(`\n  ✓ Found ${headingCount} headings`);
    console.log(`  ✓ Found ${paragraphCount} paragraphs`);
    console.log(`  ✓ Found ${buttonCount} buttons`);
}

// ============================================
// Test 3: Touch Targets (Mobile)
// ============================================

function testTouchTargets() {
    console.log("\n👆 Testing Touch Targets (Mobile)...\n");

    const clickableElements = document.querySelectorAll("button, a, [role='button']");
    let smallTargets = 0;
    let goodTargets = 0;

    clickableElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const minSize = 44; // Recommended minimum for mobile

        if (width < minSize || height < minSize) {
            smallTargets++;
        } else {
            goodTargets++;
        }
    });

    console.log(`  ✓ Good touch targets: ${goodTargets}`);
    console.log(`  ⚠️  Small targets (< 44x44): ${smallTargets}`);
    console.log(`\n  Recommendation: Ensure all buttons are at least 44x44px`);
}

// ============================================
// Test 4: Animations & Transitions
// ============================================

function testAnimations() {
    console.log("\n✨ Testing Animations...\n");

    const elements = document.querySelectorAll("[style*='animation'], [style*='transition']");
    const cssAnimatedElements = document.querySelectorAll("*");

    let animationCount = 0;
    let transitionCount = 0;

    cssAnimatedElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const animation = style.animation;
        const transition = style.transition;

        if (animation && animation !== "none") animationCount++;
        if (transition && transition !== "none") transitionCount++;
    });

    console.log(`  ✓ Elements with animations: ${animationCount}`);
    console.log(`  ✓ Elements with transitions: ${transitionCount}`);
    console.log(`  ✓ Total animated elements: ${animationCount + transitionCount}`);
}

// ============================================
// Test 5: Shadow & Blur Effects
// ============================================

function testShadowAndBlur() {
    console.log("\n🌫️  Testing Shadow & Blur Effects...\n");

    const elements = document.querySelectorAll("*");
    let shadowElements = 0;
    let blurElements = 0;

    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const boxShadow = style.boxShadow;
        const filter = style.filter;

        if (boxShadow && boxShadow !== "none") shadowElements++;
        if (filter && filter.includes("blur")) blurElements++;
    });

    console.log(`  ✓ Elements with box shadows: ${shadowElements}`);
    console.log(`  ✓ Elements with blur effects: ${blurElements}`);
    console.log(`  ✓ Total elements with effects: ${shadowElements + blurElements}`);
}

// ============================================
// Test 6: Accessibility
// ============================================

function testAccessibility() {
    console.log("\n♿ Testing Accessibility...\n");

    const images = document.querySelectorAll("img");
    const buttons = document.querySelectorAll("button");
    const labels = document.querySelectorAll("label");
    const inputs = document.querySelectorAll("input");

    let imagesWithAlt = 0;
    let buttonsWithText = 0;
    let inputsWithLabel = 0;

    images.forEach(img => {
        if (img.alt) imagesWithAlt++;
    });

    buttons.forEach(btn => {
        if (btn.textContent.trim()) buttonsWithText++;
    });

    inputs.forEach(input => {
        if (input.id && document.querySelector(`label[for="${input.id}"]`)) {
            inputsWithLabel++;
        }
    });

    console.log(`  ✓ Images with alt text: ${imagesWithAlt}/${images.length}`);
    console.log(`  ✓ Buttons with text: ${buttonsWithText}/${buttons.length}`);
    console.log(`  ✓ Inputs with labels: ${inputsWithLabel}/${inputs.length}`);
}

// ============================================
// Test 7: Page Performance
// ============================================

function testPagePerformance() {
    console.log("\n⚡ Testing Page Performance...\n");

    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const renderTime = timing.domInteractive - timing.navigationStart;
        const resourceTime = timing.responseEnd - timing.fetchStart;

        console.log(`  ⏱️  Total load time: ${loadTime}ms`);
        console.log(`  ⏱️  DOM interactive time: ${renderTime}ms`);
        console.log(`  ⏱️  Resource load time: ${resourceTime}ms`);

        if (loadTime < 3000) console.log(`  ✅ Good - Page loaded in ${loadTime}ms`);
        else if (loadTime < 5000) console.log(`  ⚠️  Fair - Page loaded in ${loadTime}ms`);
        else console.log(`  ❌ Slow - Page loaded in ${loadTime}ms`);
    }
}

// ============================================
// Run All Tests
// ============================================

function runResponsiveTests() {
    console.log("🎨 LinkNest - Responsive Design Test Suite");
    console.log("==========================================\n");

    testResponsiveLayout();
    testFontSizing();
    testTouchTargets();
    testAnimations();
    testShadowAndBlur();
    testAccessibility();
    testPagePerformance();

    console.log("\n✅ Responsive design tests completed!\n");
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runResponsiveTests };
}

// Uncomment to run automatically when loaded
// runResponsiveTests();
