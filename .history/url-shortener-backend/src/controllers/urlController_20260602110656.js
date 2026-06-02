const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const Visit = require("../models/Visit");
const QRCode = require("qrcode");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");

exports.createUrl = async (req, res) => {
    try {

        const { originalUrl,customAlias,
    expiryDate
} = req.body;

        const shortCode = customAlias?.trim()
            ? customAlias.trim()
            : nanoid(6);

        const existingUrl = await Url.findOne({ shortCode });

        if (existingUrl) {
            return res.status(400).json({
                message: "Custom alias already exists"
            });
        }

        const url = await Url.create({
            originalUrl,
            shortCode
        });
        const shortUrl = `http://localhost:5000/${shortCode}`;

        const qrCode = await QRCode.toDataURL(shortUrl);

        res.status(201).json({
            message: "URL Created Successfully",
            shortUrl,
            qrCode,
            data: url
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllUrls = async (req, res) => {
    res.json({
        message: "Get All URLs API Working"
    });
};

exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        url.clickCount += 1;
        await url.save();

        const geo = geoip.lookup(req.ip);
        const parser = new UAParser(req.headers["user-agent"]);
        const browser = parser.getBrowser().name || "Unknown";
        const device = parser.getDevice().type || "Desktop";

        await Visit.create({
        urlId: url._id,
        browser,
        device,
        country: geo?.country || "Unknown",
        city: geo?.city || "Unknown"
    });

        res.redirect(url.originalUrl);
        console.log(req.params.shortCode);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteUrl = async (req, res) => {
    try {

        const { id } = req.params;

        await Url.findByIdAndDelete(id);

        res.json({
            message: "URL Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};