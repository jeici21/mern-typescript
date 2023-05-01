import { FormEvent, useEffect, useState } from "react"
import { createCard } from "./api/createCard"
import { useParams } from "react-router-dom"
import { getDeck } from "./api/getDeck"
import { TDeck } from "./api/config"

const Deck = () => {
    const [deck, setDeck] = useState<TDeck | undefined>()
    const [cards, setCards] = useState<string[]>([])
    const [text, setText] = useState('')
    const { deckId } = useParams()

    async function handleCreateDeck(e: FormEvent) {
        e.preventDefault()
        const { cards: serverCards } = await createCard(deckId!, text)
        setCards(serverCards)
        setText("")
    }//creando carta

    /*     async function handleDeleteDeck(deckId: string) {
            await deleteDeck(deckId)
            setDecks(decks.filter(deck => deck._id !== deckId))
        }
     */
    useEffect(() => {
        async function fetchDeck() {
            if (!deckId) return
            const newDeck = await getDeck(deckId)
            setDeck(newDeck)
            setCards(newDeck.cards)
        }
        fetchDeck()
    }, [deckId])//obteniendo datos de la carta seleccionada

    return (
        <div className='App'>
            <ul className='decks'>
                {cards.map(card => (
                    <li key={card}>
                        {/* <button onClick={() => handleDeleteDeck(deck._id)}>X</button> */}
                        {card}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor='card-text'>Texto de la Carta</label>
                <input id='card-text' value={text} onChange={e => setText(e.target.value)} />
                <button>Crear Deck</button>
            </form>
        </div>
    )
}

export default Deck