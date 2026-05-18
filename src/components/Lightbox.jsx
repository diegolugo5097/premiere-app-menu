import React, { useState, useEffect } from 'react';
import s from './Lightbox.module.css';

export function Lightbox({ images, startIndex, onClose }) {
  const [cur, setCur] = useState(startIndex);

  useEffect(() => setCur(startIndex), [startIndex]);

  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  setCur(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setCur(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [images.length, onClose]);

  const prev = e => { e.stopPropagation(); setCur(i => (i - 1 + images.length) % images.length); };
  const next = e => { e.stopPropagation(); setCur(i => (i + 1) % images.length); };

  return (
    <div className={s.overlay} onClick={onClose}>
      <button className={s.close} onClick={onClose}>✕</button>

      <div className={s.frame} onClick={e => e.stopPropagation()}>
        <img src={images[cur]} alt="" className={s.img} />
        {images.length > 1 && (
          <>
            <button className={`${s.nav} ${s.prev}`} onClick={prev}>‹</button>
            <button className={`${s.nav} ${s.next}`} onClick={next}>›</button>
          </>
        )}
        <div className={s.counter}>{cur + 1} / {images.length}</div>
      </div>

      <div className={s.thumbs} onClick={e => e.stopPropagation()}>
        {images.map((url, i) => (
          <div key={i}
            className={`${s.thumb} ${i === cur ? s.thumbActive : ''}`}
            onClick={() => setCur(i)}
          >
            <img src={url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
