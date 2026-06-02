const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const Visit = require("../models/Visit");
const QRCode = require("qrcode");
const geoip = require("geoip-lite");
const fs = require("fs");
const csv = require("csv-parser");
const UAParser = require("ua-parser-js");

exports.createUrl = async (req, res) => {
    try {

        let finalExpiryDate = null;

        if (expiryDays) {
            finalExpiryDate = new Date();
            finalExpiryDate.setDate(
                finalExpiryDate.getDate() + Number(expiryDays)
            );
        }

        if (expiryDate) {
            finalExpiryDate = new Date(expiryDate);
        }
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
            shortCode,
            expiryDate: finalExpiryDate,
            userId: req.user.id
        });

        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

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
    try {

        const urls = await Url.find();

        const response = urls.map(url => ({
            ...url.toObject(),
            shortUrl: `${process.env.BASE_URL}/${url.shortCode}`
        }));

        res.json(response);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
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

        if (
            url.expiryDate &&
            new Date() > url.expiryDate
        ) {
            return res.status(410).json({
                message: "This link has expired"
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

        console.log(req.params.shortCode);
        res.redirect(url.originalUrl);

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

exports.updateUrl = async (req, res) => {
    try {

        const { id } = req.params;
        const { originalUrl, expiryDate } = req.body;
        const url = await Url.findById(id);

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        url.originalUrl = originalUrl || url.originalUrl;
        url.expiryDate = expiryDate || url.expiryDate;

        await url.save();

        res.json({
            message: "URL Updated Successfully",
            data: url
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.bulkCreateUrls = async (req, res) => {
    try {

        const results = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => {
                results.push(data);
            })
            .on("end", async () => {

                const createdUrls = [];

                for (const row of results) {

                    const shortCode =
                        row.customAlias?.trim()
                            ? row.customAlias.trim()
                            : nanoid(6);

                    const existingUrl =
                        await Url.findOne({ shortCode });

                    if (existingUrl) {
                        continue;
                    }

                    let finalExpiryDate = null;

                    if (row.expiryDays) {

                        finalExpiryDate = new Date();

                        finalExpiryDate.setDate(
                            finalExpiryDate.getDate() +
                            Number(row.expiryDays)
                        );
                    }

                    const url = await Url.create({
                        originalUrl: row.originalUrl,
                        shortCode,
                        expiryDate: finalExpiryDate,
                        bulkUpload: true
                    });

                    createdUrls.push({
                        id: url._id,
                        originalUrl: url.originalUrl,
                        shortCode: url.shortCode,
                        expiryDate: url.expiryDate,
                        shortUrl:`${process.env.BASE_URL}/${url.shortCode}`
                    });
                }

                fs.unlinkSync(req.file.path);

                res.status(201).json({
                    message: "Bulk URLs Created Successfully",
                    totalCreated: createdUrls.length,
                    data: createdUrls
                });
            });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    );

    res.json({
        token
    });
};