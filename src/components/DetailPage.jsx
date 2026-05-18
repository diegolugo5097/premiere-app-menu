import React, { useState } from 'react';
import { MENU, CATEGORY_ICONS } from '../data/menu';
import { IMAGES, GALLERY } from '../data/images';
import { getItemTheme } from '../data/themes';
import { Lightbox } from './Lightbox';
import s from './DetailPage.module.css';

function getCat(itemId) {
  for (const [cat, items] of Object.entries(MENU)) {
    if (items.find(i => i.id === itemId)) return cat;
  }
  return '';
}

function GalleryCell({ src, fallbackBg, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={s.gCell} style={{ background: fallbackBg }}
      onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {src && <img src={src} alt="" loading="lazy" className={hov ? s.gImgZoom : s.gImg}
        onError={e => { e.target.style.display = 'none'; }} />}
      <div className={`${s.gFrame} ${hov ? s.gFrameHov : ''}`} />
    </div>
  );
}

export function DetailPage({ item, dark }) {
  const [lbxIdx, setLbxIdx] = useState(null);
  const cat = getCat(item.id);
  const theme = getItemTheme(item.name, cat);
  const heroUrl = IMAGES[item.name];
  const gallery = GALLERY[item.name] || (heroUrl ? [heroUrl, heroUrl, heroUrl, heroUrl] : []);
  const D = dark;
  const dotClass = `${D ? s.dotDark : s.dotLight}`;

  return (
    <div className={`${s.page} th-${theme}`} style={{ background: D ? '#111' : '#f0f0f0' }}>

      {/* Hero */}
      <div className={`${s.hero} ${D ? s.heroDarkBorder : ''}`}>
        {heroUrl
          ? <img src={heroUrl} alt={item.name} className={s.heroImg}
              onError={e => { e.target.style.display='none'; }} />
          : <div className={`${s.heroBg} dots`} />}
        <div className={s.heroFade} />
        <div className={s.starBurst}>
          <span className={s.starTxt}>{item.tag || '★'}</span>
        </div>
        <div className={s.heroTitles}>
          <div className={s.catPill}>{CATEGORY_ICONS[cat] || '★'} {cat.toUpperCase()}</div>
          <h1 className={s.name}>{item.name.toUpperCase()}</h1>
        </div>
      </div>

      {/* Panel */}
      <div className={`${s.panel} ${D ? s.panelDark : s.panelLight}`}>
        <div className={`${s.panelHeader} ${D ? s.panelHeaderDark : ''}`}>
          <span className={s.panelPrice}>${item.price.toLocaleString('es-CO')}</span>
          {item.tag && <span className={s.panelTag}>{item.tag}</span>}
        </div>

        <div className={`${s.panelBody} ${D ? s.panelBodyDark : s.panelBodyLight} dots-color`}>

          <div className={`${s.speechBubble} ${D ? s.speechBubbleDark : s.speechBubbleLight}`}>
            <span className={s.speechTitle}>SINOPSIS</span>
            <p className={`${s.speechDesc} ${D ? s.speechDescDark : s.speechDescLight}`}>{item.desc}</p>
          </div>

          <div className={s.ingsSection}>
            <span className={`${s.ingsLabel} ${D ? s.ingsLabelDark : s.ingsLabelLight}`}>ELENCO DE INGREDIENTES</span>
            <div className={s.ings}>
              {item.ingredients.map((ing, i) => <span key={i} className={s.ing}>{ing}</span>)}
            </div>
          </div>

          <div className={`${s.thoughtBubble} ${D ? s.thoughtBubbleDark : s.thoughtBubbleLight}`}>
            <div className={`${s.dot1} ${dotClass}`} />
            <div className={`${s.dot2} ${dotClass}`} />
            <div className={`${s.dot3} ${dotClass}`} />
            <span className={s.thoughtTitle}>✦ TRIVIA ✦</span>
            <p className={`${s.thoughtTxt} ${D ? s.thoughtTxtDark : s.thoughtTxtLight}`}>{item.lore}</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className={`${s.gallery} ${D ? s.galleryDark : s.galleryLight}`}>
          <div className={`${s.galHdr} ${D ? s.galHdrDark : ''}`}>
            <span className={s.galTitle}>🎬 GALERÍA DE ESCENAS</span>
            <span className={s.galCount}>{gallery.length} TOMAS</span>
          </div>
          <div className={s.galGrid}>
            {gallery.slice(0, 4).map((url, i) => (
              <GalleryCell key={i} src={url} fallbackBg="var(--bg)" onClick={() => setLbxIdx(i)} />
            ))}
          </div>
          <div className={s.galHint}>★ TOCA PARA AMPLIAR ★</div>
        </div>
      )}

      <div style={{ height: '2rem' }} />

      {lbxIdx !== null && (
        <Lightbox images={gallery} startIndex={lbxIdx} onClose={() => setLbxIdx(null)} />
      )}
    </div>
  );
}
