const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");


const {
    createUrl,
    getAllUrls,
    deleteUrl,
    updateUrl,
    redirectUrl
} = require("../controllers/urlController");

router.post("/create", createUrl);
router.get("/all", getAllUrls);
router.delete("/:id", deleteUrl);
router.get("/:shortCode", redirectUrl);
router.put("/:id", updateUrl);
router.post("/bulk-upload",upload.single("file"),bulkCreateUrls
);

module.exports = router;