const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: 
        },

        originalUrl: {
            type: String,
            required: true,
            trim: true
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        clickCount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["ACTIVE", "EXPIRED", "DELETED"],
            default: "ACTIVE"
        },

        expiryDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Url", urlSchema);