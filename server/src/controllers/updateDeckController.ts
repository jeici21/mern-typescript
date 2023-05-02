import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function updateDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const deck = await Deck.findByIdAndUpdate(
        deckId, { $set: { title: req.body.title as string } }, { new: true }
    )
    res.json(deck)
}//req.body as TDeck como segundo parámetro si quiero actualizar todo el registro