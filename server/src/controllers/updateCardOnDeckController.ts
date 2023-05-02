import { Request, Response } from "express"
import Deck from "../models/Deck"

export async function updateCardOnDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const index = req.params.index
    const deck = await Deck.findById(deckId)
    if (!deck) return res.status(400).send('No existe un deck con este id')
    const { text }: { text: string } = req.body
    deck.cards.fill(text, parseInt(index), parseInt(index) + 1)
    await deck.save()
    res.json(deck)
}