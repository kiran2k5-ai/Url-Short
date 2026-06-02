const Url = require("../models/Url");
const { nanoid } = require("nanoid");
exports.createUrl = async (req, res) => {
    res.json({
        message: "Create URL API Working"
    });
};

exports.getAllUrls = async (req, res) => {
    res.json({
        message: "Get All URLs API Working"
    });
};

exports.deleteUrl = async (req, res) => {
    res.json({
        message: "Delete URL API Working"
    });
};