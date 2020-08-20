const express = require("express")

const db = require("../data/dbConfig")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        // translates SQL SELECT * FROM 'accounts';
        const accounts = await db
            .select("*")
            .from("accounts")

            res.json(accounts)
    } catch(err) {
        next(err)
    }
})

