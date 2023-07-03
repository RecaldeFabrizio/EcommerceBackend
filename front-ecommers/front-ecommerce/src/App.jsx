import { useState } from 'react'
import ItemListContainer from './pages/itenListsContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemDetailContainer from './pages/ItemDetailContainer';

function App() {

  return (
    <>
      <ItemListContainer/>
      <ItemDetailContainer/>
    </>
  )
}

export default App
