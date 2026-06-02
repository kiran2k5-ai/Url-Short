const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
    {
        urlId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Url",
            required: true,
            index: true
        },

        visitedAt: {
            type: Date,
            default: Date.now
        },

        browser: {
            type: String,
            default: "Unknown"
        },

        device: {
            type: String,
            default: "Unknown"
        },

        country: {
            type: String,
            default: "Unknown"
        },

        city: {
            type: String,
            default: "Unknown"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Visit", visitSchema);