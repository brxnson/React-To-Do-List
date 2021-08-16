const express = require("express");
const router = express.Router();

const schema = require ("../models/Accounts")

router.get("/", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Your request body was invalid" })
    } else {
        let data = await schema.findOne({ 
            Username: req.body.username,
            Password: req.body.password
         })
         if (!data) {
             res.status(404).json({ message: "Login not found" })
         } else {
             res.status(200).json(
                 {
                     message: "Login found!",
                     Data: data
                 }
             )
         }
    }
})

router.post("/", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Your request body was invalid" })
    } else {
        console.log(req.body)
        let ctx = await schema.findOne({ Username: req.body.username })
        if (ctx) {
            res.status(400).json({ message: "Username already registered" })
        } else {
            res.status(200).json({ message: "login created" })
            new schema({
                Username: req.body.username,
                Password: req.body.password,
                Todos: []
            }).save()
        }
    }
})

router.put("/", async (req, res, next) => {
    if (!req.body.username ||!req.body.password || !req.body.todo) {
        res.status(400).json({ message: "Your request body was invalid" })
    } else {
        const ctx = await schema.findOne({
            Username: req.body.username,
            Password: req.body.password
        })
        if (!ctx) {
            res.status(404).json({ message: "login not recognised" })
        } else {
            res.status(200).json({ message: "Successfully updated todos" })
            await schema.findOneAndUpdate({
                Username: req.body.username,
                Password: req.body.password
            }, {
                Username: req.body.username,
                Password: req.body.password,
                $push: { Todos: req.body.todo }
            })
        }
    }
})

router.delete("/", async (req, res, next) => {
    if (!req.body.username ||!req.body.password || !req.body.todo) {
        res.status(400).json({ message: "Your request body was invalid" })
    } else {
        const ctx = await schema.findOne({
            Username: req.body.username,
            Password: req.body.password
        })
        if (!ctx) {
            res.status(404).json({ message: "login not recognised" })
        } else {
            let result = await schema.findOne({
                Username: req.body.username,
                Password: req.body.password,
                Todos: req.body.todo
            })
            if (!result) {
                res.status(400).json({ message: "That todo is not in the todo list" })
            } else {
                await schema.findOneAndUpdate({
                    Username: req.body.username,
                    Password: req.body.password
                }, {
                    Username: req.body.username,
                    Password: req.body.password,
                    $pull: { Todos: req.body.todo }
                })
                res.status(200).json({ message: "Updated todos" })
            }
        }
    }
})

module.exports = router;