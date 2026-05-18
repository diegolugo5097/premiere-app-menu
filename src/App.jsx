import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { DetailPage } from './components/DetailPage';
import './App.css';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSelect(item) { setSelectedItem(item); window.scrollTo(0, 0); }
  function handleBack()       { setSelectedItem(null); window.scrollTo(0, 0); }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <header className="app-hdr">
        <div className="app-hdr-row">
          {selectedItem
            ? <button className="app-back" onClick={handleBack}>← VOLVER</button>
            : <div className="app-spacer" />}
          <div className="app-logo">
            <img src="/logo.png" alt="Premiere — Un Café de Película" className="app-logo-img" />
          </div>
          <div className="app-spacer" />
        </div>
      </header>

      {selectedItem
        ? <DetailPage item={selectedItem} />
        : <HomePage onSelectItem={handleSelect} />}
    </div>
  );
}
