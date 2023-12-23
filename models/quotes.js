const mongoose = require("mongoose");

const quotesSchema = new mongoose.Schema({
    image: {
        type: String,
        require: [true, "image must be provided"],
    },
    footerType: {
        type: Number,
        require: [true, "footerType must be provided"],
    },
    dateType: {
        type: Number,
        require: [true, "dateType must be provided"],
    },
    date: {
        type: String,
        require: [true, "date must be provided"],
    },
    dateLanguage: {
        type: Number,
        require: [true, "dateLanguage must be provided"],
    },
    datePosition: {
        type: Number,
        require: [true, "datePosition must be provided"],
    },
    datePosX: {
        type: Number,
        require: [true, "datePosX must be provided"],
    },
    datePosY: {
        type: Number,
        require: [true, "datePosY must be provided"],
    },
    dateTextFont: {
        type: Number,
        require: [true, "dateTextFont must be provided"],
    },
    dateBgColor: {
        type: String,
        require: [true, "dateBgColor must be provided"],
    },
    dateTextColor: {
        type: String,
        require: [true, "dateTextColor must be provided"],
    },
    footerBackground: {
        type: String,
        require: [true, "footerBackground must be provided"],
    },
    extraBackground: {
        type: String,
        require: [true, "extraBackground must be provided"],
    },
    headerColor: {
        type: String,
        require: [true, "headerColor must be provided"],
    },
    subDetailsColor: {
        type: String,
        require: [true, "subDetailsColor must be provided"],
    },
});

module.exports = mongoose.model('Quotes', quotesSchema);