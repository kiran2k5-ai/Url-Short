const express = require("express");
const router = express.Router();


const {
    createUrl,
    getAllUrls,
    deleteUrl,
    updateUrl
} = require("../controllers/urlController");

router.post("/create", createUrl);
router.get("/all", getAllUrls);
router.delete("/:id", deleteUrl);
router.get("/:shortCode", redirectUrl);

module.exports = router;