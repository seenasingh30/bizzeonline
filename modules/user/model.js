const mongoose = require("mongoose");
const scheme = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
    strict: false,
});

scheme.set("toJSON", {
    virtuals: true,
});

scheme.set("toObject", {
    virtuals: true,
});
module.exports = mongoose.model("users", scheme);