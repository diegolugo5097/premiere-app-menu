import React, { useState } from 'react';
import { MENU, CATEGORY_ICONS, ALL_ITEMS } from '../data/menu';
import { IMAGES } from '../data/images';
import { getItemTheme } from '../data/themes';
import s from './HomePage.module.css';

function ItemCard({ item, onClick, dark }) {
  const [hovered, setHovered] = useState(false);
  const theme = `th-${getItemTheme(item.name, item.cat || '')}`;
  const imgUrl = IMAGES[item.name];

  return (
    <div
      className={`${s.card} ${theme} ${dark ? s.cardDark : s.cardLight} ${hovered ? (dark ? s.cardHoverDark : s.cardHover) : ''}`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${s.cardBar} ${dark ? s.cardBarDark : ''}`} />
      <div className={`${s.cardImg} ${dark ? s.cardImgDark : ''} dots-color`}>
        {imgUrl
          ? <img src={imgUrl} alt={item.name} loading="lazy"
              className={hovered ? s.imgZoom : s.img}
              onError={e => { e.target.style.display = 'none'; }} />
          : <div className={s.imgFallback} />}
        <div className={s.imgFade} />
        {item.tag && <div className={s.badge}>{item.tag}</div>}
      </div>
      <div className={`${s.cardBody} ${dark ? s.cardBodyDark : s.cardBodyLight}`}>
        <div className={`${s.cardName} ${dark ? s.cardNameDark : s.cardNameLight}`}>{item.name}</div>
        <div className={s.cardRow}>
          <span className={s.price}>${item.price.toLocaleString('es-CO')}</span>
          <span className={`${s.arrow} ${dark ? s.arrowDark : ''}`}>▶ VER</span>
        </div>
      </div>
    </div>
  );
}

export function HomePage({ onSelectItem, dark }) {
  const [activeCat, setActiveCat] = useState('Cafés');
  const [searchQ, setSearchQ] = useState('');

  const results = searchQ.trim()
    ? ALL_ITEMS.filter(i => {
        const q = searchQ.toLowerCase();
        return i.name.toLowerCase().includes(q)
          || i.desc.toLowerCase().includes(q)
          || i.ingredients.some(x => x.toLowerCase().includes(q))
          || i.cat.toLowerCase().includes(q);
      })
    : null;

  const items = results || MENU[activeCat];
  const D = dark;

  return (
    <div className={s.page} style={{ background: D ? '#111' : '#f0f0f0' }}>

      {/* Search */}
      <div className={`${s.searchWrap} ${D ? s.searchWrapDark : s.searchWrapLight}`}>
        <i className="ti ti-search" style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:14, pointerEvents:'none', color: D ? '#ffd700' : '#000' }} aria-hidden="true" />
        <input
          className={`${s.searchInput} ${D ? s.searchInputDark : s.searchInputLight}`}
          type="text"
          placeholder="Buscar un héroe o villano..."
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
        />
        {searchQ && (
          <button className={`${s.clearBtn} ${D ? s.clearBtnDark : s.clearBtnLight}`} onClick={() => setSearchQ('')}>✕</button>
        )}
      </div>

      {/* Hero */}
      {!searchQ && (
        <div className={`${s.hero} ${D ? s.heroDark : s.heroLight} dots`}>
          <div className={s.heroRays} />
          <div className={s.heroContent}>
            <div className={s.heroPow}>✦ MENÚ ESTELAR ✦</div>
            <div className={s.heroTitle}>¡UN CAFÉ<br />DE PELÍCULA!</div>
            <div className={s.heroTagline}>Elige tu misión, héroe</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      {!searchQ && (
        <div className={`${s.cats} ${D ? s.catsDark : s.catsLight}`}>
          {Object.keys(MENU).map(cat => (
            <button
              key={cat}
              className={`${s.catBtn} ${D ? s.catBtnDark : s.catBtnLight} ${cat === activeCat ? s.catBtnOn : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
      )}

      {/* Section header */}
      <div className={s.secHdr}>
        <div className={`${s.secTitle} ${D ? s.secTitleDark : s.secTitleLight}`}>
          {searchQ
            ? `💥 ${items.length} RESULTADO${items.length !== 1 ? 'S' : ''}`
            : `${CATEGORY_ICONS[activeCat]} ${activeCat.toUpperCase()}`}
        </div>
        <div className={`${s.secLine} ${D ? s.secLineDark : ''}`} />
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className={`${s.empty} ${D ? s.emptyDark : s.emptyLight}`}>
          <span className={s.emptyPow}>☠ POW ☠</span>
          <span className={`${s.emptyTxt} ${D ? s.emptyTxtDark : s.emptyTxtLight}`}>SIN RESULTADOS PARA &ldquo;{searchQ}&rdquo;</span>
        </div>
      ) : (
        <div className={s.grid}>
          {items.map(item => (
            <ItemCard key={item.id} item={item} onClick={onSelectItem} dark={dark} />
          ))}
        </div>
      )}

      <div className={`${s.footer} ${D ? s.footerDark : s.footerLight}`}>
        <p className={D ? s.footerTxtDark : s.footerTxtLight}>★ PREMIERE · UN CAFÉ DE PELÍCULA · CIRCASIA ★</p>
      </div>
    </div>
  );
}
