import React from 'react';
import './Button.css';

const Button = ({ onClick, text }) => {
  return (
    <section onClick={onClick} id="Gira">
      {text}
    </section>
  );
};

export default Button;
