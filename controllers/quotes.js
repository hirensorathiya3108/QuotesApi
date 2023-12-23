const getAllQuotes = async (req, res) => {
    res.status(200).json({ msg: "I am getAllQuotes" });
};

const getAllQuotesTesting = async (req, res) => {
    res.status(200).json({ msg: "I am getAllQuotesTesting" });
};

module.exports = { getAllQuotes, getAllQuotesTesting };