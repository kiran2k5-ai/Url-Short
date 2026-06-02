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
router.get(
    "/all",
    authMiddleware,
    getAllUrls
);
router.post(
    "/create",
    authMiddleware,
    createUrl
);

router.get(
    "/all",
    authMiddleware,
    getAllUrls
);

router.delete(
    "/:id",
    authMiddleware,
    deleteUrl
);

router.put(
    "/:id",
    authMiddleware,
    updateUrl
);

router.post(
    "/bulk-upload",
    authMiddleware,
    upload.single("file"),
    bulkCreateUrls
);
router.get("/:shortCode", redirectUrl);
module.exports = router;
