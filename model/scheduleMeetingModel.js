const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const scheduleMeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Title"],
    },
    agenda: {
        type: String,
        required: [true, "Please Enter Purpose"],

    },
    guest: {
        type: String,
        required: [true, "Please Enter Guest Name"]
    },
    meeting_date: {
        type: Date,
        default: null
    },
    guest_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    meeting_owner_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    isOwner: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    phone: {
        type: String,
    },

    country: {
        type: String,
        default: null
    },

    profession: {
        type: String,
        default: null
    }

});

const scheduleMeetingModel = mongoose.model("meeting", scheduleMeetingSchema)

module.exports = { scheduleMeetingModel }