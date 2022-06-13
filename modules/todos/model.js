const mongoose = require("mongoose");
const scheme = new mongoose.Schema({
    title: {
        type: String,
    },
    time: {
        type : Date,
    },
    uid : {
        type: mongoose.Schema.Types.ObjectId,
    },
    status : {
        type : Boolean,
        default : false,
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
module.exports = mongoose.model("todo", scheme);