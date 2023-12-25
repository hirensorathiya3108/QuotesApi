const Quotes = require("../models/quotes");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

// Generate a random key (32 bytes for AES-256)
// const secretKey = crypto.randomBytes(32).toString('base64');
// console.log('Generated Key:', secretKey);
const secretKey = "L4G6ve5Z92Pk/UY27CJ3Qazx5MF+qe3w994IZdcRKKM=";
const iv = "j1z+Ud2Yd3Itnbr1FLCW3w==";

// Generate a random IV (16 bytes for AES-256-CBC)
// const iv = crypto.randomBytes(16).toString('base64');
// console.log('Generated IV:', iv);

// const fixKeyLength = (key) => {
//     const keyLength = 32; // AES-256 requires a 32-byte key
//     const buffer = Buffer.alloc(keyLength);
//     Buffer.from(key).copy(buffer);
//     return buffer;
// };

const encryptData = (data, key, iv) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
    let encryptedData = cipher.update(data, 'utf-8', 'base64');
    encryptedData += cipher.final('base64');
    return encryptedData;
};

const decryptData = (encryptedData, key, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
};


const getAllQuotes = async (req, res) => {
    const quotes = await Quotes.find(req.query);
    const response = {
        success: true,
        quotes
    };
    const originalData = 'This is a secret message!';
    const encryptResponseData = encryptData(JSON.stringify(response), secretKey, iv);
    console.log('Encrypted Data:', encryptResponseData);
    const decryptedData = decryptData(encryptResponseData, secretKey, iv);
    console.log('Decrypted Data:', decryptedData);
    try {
        res.status(200).json(encryptResponseData);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }


    // const myData = await Quotes.find(req.query);
    // res.status(200).json({ myData });
};

const getAllQuotesTesting = async (req, res) => {
    const myTestingData = await Quotes.find(req.query);
    res.status(200).json({ myTestingData });
};

module.exports = { getAllQuotes, getAllQuotesTesting };