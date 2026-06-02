const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const Visit = require("../models/Visit");
const QRCode = require("qrcode");
const geoip = require("geoip-lite");

exports.createUrl = async (req, res) => {
    try {

        const { originalUrl } = req.body;

        const shortCode = nanoid(6);

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
};;

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

await Visit.create({
    urlId: url._id,
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