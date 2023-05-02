import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function updateDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const deck = await Deck.findByIdAndUpdate(deckId, { title: req.body.title as string }, { new: true })
    res.json(deck)
}