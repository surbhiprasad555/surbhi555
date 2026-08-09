import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './InteractiveSticker.css';

export default function InteractiveSticker({ src, alt, className, message, style, ...props }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
    setShow(true);
  };

  const handleMouseMove = (e) => {
    if (show) {
      setPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ ...style, cursor: 'pointer', pointerEvents: 'auto' }}
        {...props}
      />
      {show && typeof document !== 'undefined' && createPortal(
        <div 
          className="sticker-message-bubble"
          style={{ 
            left: pos.x, 
            top: pos.y - 30 
          }}
        >
          {message}
        </div>,
        document.body
      )}
    </>
  );
}
