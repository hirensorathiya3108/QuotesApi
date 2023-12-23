const Quotes = require("../models/quotes");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'yourSecretKey'; // Replace with your secret key
const iv = crypto.randomBytes(16);
console.log("iv =>" + iv);

// const encryptData = (data) => {
//     const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//     let encryptedData = cipher.update(data, 'utf-8', 'hex');
//     encryptedData += cipher.final('hex');
//     return encryptedData;
// };

// Function to encrypt data
// function encryptData(data) {
//     const cipher = crypto.createCipher('aes256', secretKey);
//     let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
//     encryptedData += cipher.final('hex');
//     return encryptedData;
//   }

const fixKeyLength = (key) => {
    const keyLength = 32; // AES-256 requires a 32-byte key
    const buffer = Buffer.alloc(keyLength);
    Buffer.from(key).copy(buffer);
    return buffer;
};

console.log("key => " + fixKeyLength(key));

const encryptData = (data) => {
    const cipher = crypto.createCipheriv(algorithm, fixKeyLength(key), iv);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};

const encryptedDataFromAndroid = '...'; // Replace with the actual encrypted data
const ivFromAndroid = '...'; // Replace with the actual IV

const decryptData = (encryptedData, iv) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, fixKeyLength(key), iv);
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};

const getAllQuotes = async (req, res) => {
    const myData = await Quotes.find(req.query);
    const encryptedData = encryptData(JSON.stringify({ myData, success: true }));
    const decryptedData = decryptData(encryptedData, iv);
    res.status(200).json({ decryptedData });
    console.log('Decrypted Data:', decryptedData);
    // const myData = await Quotes.find(req.query);
    // res.status(200).json({ myData });
};

const getAllQuotesTesting = async (req, res) => {
    const myTestingData = await Quotes.find(req.query);
    res.status(200).json({ myTestingData });
};

module.exports = { getAllQuotes, getAllQuotesTesting };