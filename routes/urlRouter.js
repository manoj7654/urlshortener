// <-----------------importing express ------------------>
const express=require("express")
const { url, sortUrl } = require("../controller/urlController")
const { authenticate } = require("../middleware/authenticate")

// <------------creating urlshortner router------------------->
const urlRouter=express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     URL:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         url:
 *           type: string
 *           description: The original URL to be shortened
 *         shortenUrl:
 *           type: string
 *           description: The shortened version of the URL
 *       example:
 *         url: "http://example.com"
 *         shortenUrl: "http://localhost:4500/shortId"
 */

urlRouter.post("/originalUrl",authenticate,url)

urlRouter.get("/shorten/:shortenUrl",authenticate,sortUrl)


module.exports={urlRouter}

