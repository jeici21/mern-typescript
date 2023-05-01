import { Request, Response } from "express"
import Deck, { TDeck } from "../models/Deck"

export async function createDeckController(req: Request, res: Response) {
    const newDeck = new Deck(req.body as TDeck)
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
}