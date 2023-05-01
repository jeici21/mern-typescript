import { Request, Response } from "express"
import Deck from "../models/Deck"

export async function createCardForDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const deck = await Deck.findById(deckId)
    if (!deck) return res.status(400).send('No existe un deck con este id')
    const { text } = req.body as { text: string }
    deck.cards.push(text)
    await deck.save()
    res.json(deck)
}