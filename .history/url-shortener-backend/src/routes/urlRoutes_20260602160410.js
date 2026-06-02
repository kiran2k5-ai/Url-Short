const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const authMiddleware = require("../middlewares/authMiddleware");

const {
    createUrl,
    getAllUrls,
    deleteUrl,
    updateUrl,
    redirectUrl,
    bulkCreateUrls
} = require("../controllers/urlController");

router.post("/create", createUrl);
router.get("/all", getAllUrls);
router.delete("/:id", deleteUrl);
router.put("/:id", updateUrl);
router.post("/bulk-upload", upload.single("file"), bulkCreateUrls);
router.get("/:shortCode", redirectUrl);
module.exports = router;
