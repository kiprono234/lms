import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import LessonModule from './components/LessonModule';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar username="Pron" />
        <LessonModule />
      </div>
    </BrowserRouter>
  );
}

export default App;