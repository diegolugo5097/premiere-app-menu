import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { DetailPage } from './components/DetailPage';
import './App.css';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  function handleSelect(item) { setSelectedItem(item); window.scrollTo(0, 0); }
  function handleBack()       { setSelectedItem(null); window.scrollTo(0, 0); }

  return (
    <div style={{ minHeight: '100vh', background: dark ? '#111' : '#f0f0f0', transition: 'background .3s' }}>
      <header className="app-hdr">
        <div className="app-hdr-row">
          {selectedItem
            ? <button className="app-back" onClick={handleBack}>← VOLVER</button>
            : <div className="app-spacer" />}

          <div className="app-logo">
            <span className="app-circasia">CIRCASIA</span>
            <span className="app-premiere">PREMIERE</span>
            <span className="app-sub">Un Café de Película</span>
          </div>

          <div className="app-spacer">
            <button
              className="dark-toggle"
              onClick={() => setDark(d => !d)}
              aria-label={dark ? 'Modo día' : 'Modo noche'}
              title={dark ? 'Modo día' : 'Modo noche'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {selectedItem
        ? <DetailPage item={selectedItem} dark={dark} />
        : <HomePage onSelectItem={handleSelect} dark={dark} />}
    </div>
  );
}
