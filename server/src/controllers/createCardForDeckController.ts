import { Request, Response } from "express"
import Deck, { Card } from "../models/Deck"

export async function createCardForDeckController(req: Request, res: Response) {
    const deck = await Deck.findById(req.params.deckId)
    if (!deck) return res.status(400).send('No existe un deck con este id')
    const { text }: Card = req.body
    deck.cards.push(text)
    await deck.save()
    res.json(deck)
}