import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({ title: String });//esquema de la tabla

const Deck = mongoose.model('Deck', DeckSchema);//creando la tabla

export default Deck