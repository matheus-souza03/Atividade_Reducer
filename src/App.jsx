import { useReducer } from 'react'

const initialState = {
  nome: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'ALTERAR_NOME':
      return { ...state, nome: action.payload }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  function handleChange(e) {
    dispatch({ type: 'ALTERAR_NOME', payload: e.target.value })
  }

  return (
    <div>
      <h1>{state.nome}</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        onChange={handleChange}
      />
    </div>
  )
}

export default App
