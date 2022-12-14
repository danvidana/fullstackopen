import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux'

import NoteReducer from './reducers/NoteReducer'

const store = createStore(NoteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)

