import { FormEvent, useEffect, useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";
import { deleteDeck } from './api/deleteDeck';
import { getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';
import { TDeck } from './api/config';

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  async function handleCreateDeck(e: FormEvent) {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle("")//vaciando el input
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])//recibiendo todos los registros en el front

  return (
    <div className='App'>
      <ul className='decks'>
        {decks.map(deck => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Título del Deck</label>
        <input id='deck-title' value={title} onChange={e => setTitle(e.target.value)} />
        <button>Crear Deck</button>
      </form>
    </div>
  )
}

export default App