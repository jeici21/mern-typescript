import mongoose from "mongoose";

export type TDeck = { title: string, cards: string[] }
export type Card = { text: string }

const Schema = mongoose.Schema;
const DeckSchema = new Schema({ title: String, cards: [String] });//esquema de la tabla
const Deck = mongoose.model('Deck', DeckSchema);//creando la tabla

export default Deck