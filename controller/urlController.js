const Cryptr = require('cryptr');
const random = require("random-string-generator");
const { urlModel } = require('../modal/urlModal');

const cryptr = new Cryptr('myTotallySecretKey');

require("dotenv").config();


const deployedUrl=process.env.url

const generateUniqueShortUrl = async (length) => {
    let shortenUrl = random(length, "lower");
    let existingUrl = await urlModel.findOne({ shortenUrl });
    while (existingUrl) {
        shortenUrl = random(length, "lower");
        existingUrl = await urlModel.findOne({ shortenUrl });
    }
    return shortenUrl;
};

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

const url = async (req, res) => {
    console.log('Incoming request body:', req.body);
    const { url, length, alias } = req.body;
    if (!isValidUrl(url)) {
        return res.status(400).send({ msg: "Invalid URL format" });
    }

    const encryptedUrl = cryptr.encrypt(url);
    let shortenUrl;

    try {
        if (alias) {
            const existingUrl = await urlModel.findOne({ shortenUrl: alias });
            if (existingUrl) {
                return res.status(409).send({ msg: "Alias already in use" });
            }
            shortenUrl = alias;
        } else {
            shortenUrl = await generateUniqueShortUrl(length || 6);
        }

        const url_constructor = new urlModel({ url: encryptedUrl, shortenUrl });
        await url_constructor.save();
        const result = `${deployedUrl}/${shortenUrl}`;
        return res.status(201).send({ short_url: result, originalUrl: url });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "server error" });
    }
};

const sortUrl = async (req, res) => {
    const { shortenUrl } = req.params;

    try {
        const find_shorten = await urlModel.findOne({ shortenUrl });

        if (find_shorten) {
            const decryptedUrl = cryptr.decrypt(find_shorten.url);
            return res.redirect(decryptedUrl);
        } else {
            res.status(404).send("No link associated with this link, please check again.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "server error" });
    }
};

module.exports = { url, sortUrl };
