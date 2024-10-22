import { useState } from 'react'
import './App.css'
import Header from './components/header';
import Padron from './components/padron'

function App() {
  return (
    <div>
      <Header />
      <Padron />  {/* Renderiza el componente Padron */}
    </div>
  );
}

export default App;