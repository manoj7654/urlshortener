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


/**
 * @swagger
 * /originalUrl:
 *   post:
 *     summary: Shorten a URL
 *     tags: [URL]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to be shortened
 *               alias:
 *                 type: string
 *                 description: Custom alias for the shortened URL
 *               length:
 *                 type: integer
 *                 description: Length of the random alias if no alias is provided
 *     responses:
 *       201:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 short_url:
 *                   type: string
 *                   description: The shortened URL
 *                 originalUrl:
 *                   type: string
 *                   description: The original URL
 *       409:
 *         description: Alias already in use
 *       500:
 *         description: Server error
 */

urlRouter.post("/originalUrl",authenticate,url)



/**
 * @swagger
 * /{shortenUrl}:
 *   get:
 *     summary: Redirect to the original URL using the shortened URL
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: shortenUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The shortened URL alias
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: No link associated with this alias
 *       500:
 *         description: Server error
 */
urlRouter.get("/:shortenUrl",sortUrl)


module.exports={urlRouter}

