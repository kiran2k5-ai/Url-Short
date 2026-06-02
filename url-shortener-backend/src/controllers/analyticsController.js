const Url = require("../models/Url");
const Visit = require("../models/Visit");

exports.getAnalytics = async (req, res) => {
    try {

        const { urlId } = req.params;

        const url = await Url.findById(urlId);

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        const recentVisits = await Visit.find({ urlId })
            .sort({ visitedAt: -1 })
            .limit(10);

        const lastVisit = await Visit.findOne({ urlId })
            .sort({ visitedAt: -1 });

        res.json({
            shortCode: url.shortCode,
            totalClicks: url.clickCount,
            lastVisited: lastVisit
                ? lastVisit.visitedAt
                : "No visits yet",
            recentVisits
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};