import { useReducer, useState } from 'react'

const initialState = {
  tarefas: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADICIONAR_TAREFA':
      return {
        ...state,
        tarefas: [...state.tarefas, { id: Date.now(), texto: action.payload, concluida: false }]
      }
    case 'REMOVER_TAREFA':
      return {
        ...state,
        tarefas: state.tarefas.filter(t => t.id !== action.payload)
      }
    case 'MARCAR_CONCLUIDA':
      return {
        ...state,
        tarefas: state.tarefas.map(t =>
          t.id === action.payload ? { ...t, concluida: !t.concluida } : t
        )
      }
    case 'LIMPAR_TAREFAS':
      return { ...state, tarefas: [] }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [input, setInput] = useState('')

  function handleAdicionar() {
    if (input.trim() === '') return
    dispatch({ type: 'ADICIONAR_TAREFA', payload: input })
    setInput('')
  }

  return (
    <div>
      <h1>Sistema de Tarefas</h1>

      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleAdicionar}>Adicionar</button>
      <button onClick={() => dispatch({ type: 'LIMPAR_TAREFAS' })}>Limpar Tarefas</button>

      <ul>
        {state.tarefas.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.concluida ? 'line-through' : 'none' }}>
              {t.texto}
            </span>
            <button onClick={() => dispatch({ type: 'MARCAR_CONCLUIDA', payload: t.id })}>
              {t.concluida ? 'Desmarcar' : 'Concluir'}
            </button>
            <button onClick={() => dispatch({ type: 'REMOVER_TAREFA', payload: t.id })}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
