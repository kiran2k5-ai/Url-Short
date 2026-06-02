const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.createUrl = async (req, res) => {
    try {

        const { originalUrl } = req.body;

        const shortCode = nanoid(6);

        const url = await Url.create({
            originalUrl,
            shortCode
        });

        res.status(201).json({
            message: "URL Created Successfully",
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
        
        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteUrl = async (req, res) => {
    res.json({
        message: "Delete URL API Working"
    });
};