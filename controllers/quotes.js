const Quotes = require("../models/quotes");


const getAllQuotes = async (req, res) => {
    const myData = await Quotes.find(req.query);
    res.status(200).json({ myData });
};

const getAllQuotesTesting = async (req, res) => {
    const myTestingData = await Quotes.find(req.query);
    res.status(200).json({myTestingData});
};

module.exports = { getAllQuotes, getAllQuotesTesting };