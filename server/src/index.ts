import express from "express";
import mongoose from 'mongoose'
import Deck from "./models/Deck";
import { config } from 'dotenv'
import cors from 'cors'

type TDeck = { title: string }

config()
const PORT = 5000
const app = express()

app.use(cors({ origin: "*" }))//garantizando el acceso a editar la bd desde cualquier origen
app.use(express.json())//especificando que los datos se manejarán como json

app.get('/decks', async (req, res) => {
    const decks = await Deck.find()
    res.json(decks)
})//mostrando todos los registros en formato json

app.post("/decks", async (req, res) => {
    const deckRequest: TDeck = req.body;
    const newDeck = new Deck(deckRequest)
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})//añadiendo un registro a la bd en formato json

app.delete('/decks/:deckId', async (req, res) => {
    const deckId = req.params.deckId
    const deck = await Deck.findByIdAndDelete(deckId)
    res.json(deck)
})//borrando el registro seleccionado

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
    app.listen(PORT)
})