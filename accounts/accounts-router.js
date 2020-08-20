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

router.get("/:id", async (req, res, next) => {
    try {
        // translates SQL SELECT * FROM 'accounts' WHERE 'id' = ?;
        // [account] destructures the response to return a single object rather than an array
        // changing db.select to db.first achieves the same result
        // adding db('accounts') removes the need for .from('accounts')
        // leaving teh .first("*") empty defaults to the wildcard

        const account = await db('accounts')
            .where("id", req.params.id)
            .first()

            res.json(account)
    } catch(err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        // translates INSERT INTO 'posts' ('name', 'budget') VALUES (?, ?);
        const [id] = await db('accounts')
            .insert(payload)
        const account = await db('accounts')
            .where("id", id)
            .first()

            res.json(account)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        // translates to UPDATE 'accounts' SET 'name' = ? AND 'budget' = ? WHERE "id" = ?;
        await db('accounts')
            .where("id", req.params.id)
            .update(payload)
        const account = await db('accounts')
            .where("id", req.params.id)
            .first()

            res.json(account)
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        // translates to DELETE FROM 'accounts' WHERE 'id' = ?;
        await db('accounts')
            .where("id", req.params.id)
            .del()

            // 204 status means sueccessful with no data to return
            res.status(204).end()
    } catch(err) {
        next(err)
    }
})

module.exports = router