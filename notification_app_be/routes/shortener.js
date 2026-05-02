const express = require("express");
const router = express.Router();

// In-memory database
let db = [];

// Create Short URL
router.post("/", (req, res) => {
    const { url, validity, shortcode } = req.body;

    // Validate URL
    if (!url) {
        return res.status(400).json({
            message: "URL is required"
        });
    }

    // Generate shortcode if custom code not provided
    const generatedCode =
        shortcode || Math.random().toString(36).substring(2, 8);

    // Check duplicate shortcode
    const existingCode = db.find(item => item.shortcode === generatedCode);

    if (existingCode) {
        return res.status(409).json({
            message: "Shortcode already exists"
        });
    }

    // Create new entry
    const newEntry = {
        originalUrl: url,
        shortcode: generatedCode,
        expiry: new Date(
            Date.now() + (validity || 30) * 60 * 1000
        ).toISOString()
    };

    // Store in database
    db.push(newEntry);

    // Response
    res.status(201).json({
        shortLink: `http://localhost:5000/${generatedCode}`,
        expiry: newEntry.expiry
    });
});

// Export router + database
module.exports = router;
module.exports.db = db;