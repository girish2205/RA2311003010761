const express = require("express");
const cors = require("cors");
const shortenerRoutes = require("./routes/shortener");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// URL Shortener POST Route
app.use("/shorturls", shortenerRoutes);

// Redirect Route for Short URLs
app.get("/:code", (req, res) => {
    const code = req.params.code;

    // Find shortcode in database
    const entry = shortenerRoutes.db.find(item => item.shortcode === code);

    // If shortcode not found
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    // If shortcode expired
    if (new Date() > new Date(entry.expiry)) {
        return res.status(410).send("Short URL expired");
    }

    // Redirect to original URL
    res.redirect(entry.originalUrl);
});

// Server Port
const PORT = 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});