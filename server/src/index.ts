import express from "express";
import mongoose from 'mongoose'
import Deck from "./models/Deck";

const PORT = 5000
const app = express()

app.get("/", (req, res) => {
    res.send("gg")
})

app.get("/hello", (req, res) => {
    res.send("hello world")
})

mongoose.connect(
    'mongodb+srv://flashcardsage:5PzLXCj8v7nLVoKb@cluster0.pjfelzr.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT)//conectándose a la bd
})
