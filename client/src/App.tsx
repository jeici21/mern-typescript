import { FormEvent, useEffect, useState } from 'react'
import './App.css'

type TDeck = { title: string, _id: string }

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  async function handleCreateDeck(e: FormEvent) {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/decks', {
      method: 'POST', body: JSON.stringify({ title }), headers: { "Content-Type": "application/json" }
    })//conectando con el server y guardando el ingreso en formato json
    const deck = await response.json()
    setDecks([...decks, deck])
    setTitle("")//vaciando el input
  }

  async function handleDeleteDeck(deckId: string) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: 'DELETE', body: JSON.stringify({ title })
    })//conectando con el server y eliminando el ingreso
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])//recibiendo todos los registros en el front

  return (
    <div className='App'>
      <ul className='decks'>
        {decks.map(deck => (
          <li key={deck._id}>{deck.title}
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
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