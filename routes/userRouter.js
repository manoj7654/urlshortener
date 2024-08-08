// <-----------------importing express ------------------>
const express=require("express")

// <------------creating employee router------------------->
const userRouter=express.Router()

// <-------------importing register,loging --------------------->
const { register, login } = require("../controller/userController")

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: user@gmail.com
 *         password: user@7654
 */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or invalid data
 *       500:
 *         description: Server error
 */
// <--------for register--------------->
userRouter.post("/register",register)



/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *              email: user@gmail.com
 *              password: user@7654
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */


// <----------------for login----------------->
userRouter.post("/login",login)


// <------------exporting userRouter------------->
module.exports={userRouter}