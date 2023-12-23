require("dotenv").config();
const connectDB = require("./db/connect");
const Quotes = require("./models/quotes");

const QuotesJson = require("./quotes.json")

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        await Quotes.create(QuotesJson);
        console.log("success");
    }catch(error){
        console.log(error);
    }
};

start();