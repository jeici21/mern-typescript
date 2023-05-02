import express from "express";
import mongoose from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";
import { updateDeckController } from "./controllers/updateDeckController";

config()
const PORT = 5000
const app = express()

app.use(cors({ origin: "*" }))//garantizando el acceso a editar la bd desde cualquier origen
app.use(express.json())//especificando que los datos se manejarán como json

app.get('/decks', getDecksController)//mostrando todos los registros en formato json
app.post("/decks", createDeckController)//añadiendo un registro a la bd en formato json
app.put("/decks/:deckId", updateDeckController)//actualizando el título del registro en la bd
app.delete('/decks/:deckId', deleteDeckController)//borrando el registro seleccionado
app.get('/decks/:deckId', getDeckController)//mostrando la carta seleccionada
app.post("/decks/:deckId/cards", createCardForDeckController)//añadiendo carta al deck seleccionado
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController)

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
    app.listen(PORT)
})