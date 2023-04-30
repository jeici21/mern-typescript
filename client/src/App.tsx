import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')

  async function handleCreateDeck(e: FormEvent) {
    e.preventDefault()
    await fetch('http://localhost:5000/decks', {
      method: 'POST', body: JSON.stringify({ title }), headers: { "Content-Type": "application/json" }
    })//conectando con el server y guardando el ingreso en formato json
    setTitle("")//vaciando el input
  }

  return (
    <>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Título del Deck</label>
        <input id='deck-title' value={title} onChange={e => setTitle(e.target.value)} />
        <button>Crear Deck</button>
      </form>
    </>
  )
}

export default App