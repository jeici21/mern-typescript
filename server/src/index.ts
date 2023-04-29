import express, { Request, Response } from "express";
import mongoose from 'mongoose'
import Deck from "./models/Deck";
import { config } from 'dotenv'

config()
const PORT = 5000
const app = express()

app.use(express.json())//especificando que los datos se manejarán como json

app.post("/decks", async (req, res) => {
    const newDeck = new Deck({ title: req.body.title })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})//añadiendo un registro a la bd

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`escuchando en el puerto ${PORT}`)
    app.listen(PORT)//conectándose a la bd
})