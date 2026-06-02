const express = require("express");
const router = express.Router();

const {
    createUrl,
    getAllUrls,
    deleteUrl
} = require("../controllers/urlController");

router.post("/create", createUrl);
router.get("/all", getAllUrls);
router.delete("/:id", deleteUrl);

module.exports = router;