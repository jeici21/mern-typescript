import { Request, Response } from "express"
import Deck from "../models/Deck"

export async function deleteCardOnDeckController(req: Request, res: Response) {
    const deck = await Deck.findById(req.params.deckId)
    if (!deck) return res.status(400).send('No existe un deck con este id')
    deck.cards.splice(parseInt(req.params.index), 1)
    await deck.save()
    res.json(deck)
}