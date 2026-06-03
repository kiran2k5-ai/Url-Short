import { formatDate } from "./formatters";

const countBy = (items, getKey) => {
    const counts = new Map();

    items.forEach((item) => {
        const key = getKey(item) || "Unknown";
        counts.set(key, (counts.get(key) || 0) + 1);
    });

    return Array.from(counts.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((left, right) => right.value - left.value);
};

export const buildAnalyticsSummary = (urls, analyticsMap) => {
    const allVisits = [];
    let totalClicks = 0;

    urls.forEach((url) => {
        totalClicks += Number(url.clickCount || 0);
        const analytics = analyticsMap.get(url._id);

        analytics?.recentVisits?.forEach((visit) => {
            allVisits.push({
                ...visit,
                urlId: url._id,
                shortCode: url.shortCode,
                originalUrl: url.originalUrl
            });
        });
    });

    const groupedByDay = new Map();

    allVisits.forEach((visit) => {
        const key = new Date(visit.visitedAt).toISOString().slice(0, 10);
        groupedByDay.set(key, (groupedByDay.get(key) || 0) + 1);
    });

    const clickTrend = Array.from(groupedByDay.entries())
        .sort((left, right) => new Date(left[0]) - new Date(right[0]))
        .map(([day, value]) => ({
            day: formatDate(day, { month: "short", day: "numeric" }),
            clicks: value
        }));

    return {
        totalClicks,
        clickTrend,
        browserData: countBy(allVisits, (visit) => visit.browser),
        deviceData: countBy(allVisits, (visit) => visit.device),
        countryData: countBy(allVisits, (visit) => visit.country),
        cityData: countBy(allVisits, (visit) => visit.city),
        recentVisits: allVisits
            .sort((left, right) => new Date(right.visitedAt) - new Date(left.visitedAt))
            .slice(0, 10)
    };
};