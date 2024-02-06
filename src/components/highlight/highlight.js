import React from 'react';

export default function Highlight({ children, backgroundColor = '#eff6ff', color = '#032e7a' }) {
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
