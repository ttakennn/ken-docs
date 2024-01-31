import React from 'react';

export default function Highlight({ children, backgroundColor = '#ddefff', color = '#1c1e21' }) {
  return (
    <span
      style={{
        backgroundColor: backgroundColor,
        borderRadius: '2px',
        color: color,
        padding: '0.2rem',
      }}
    >
      {children}
    </span>
  );
}
