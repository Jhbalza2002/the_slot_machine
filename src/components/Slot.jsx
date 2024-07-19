import React from 'react';
import './Slot.css';

const Slot = ({ className }) => {
  const slotImages = {
    a1: "seven.png",
    a2: "cherries.png",
    a3: "club.png",
    a4: "diamond.png",
    a5: "heart.png",
    a6: "spade.png",
    a7: "joker.png",
  };

  const imageName = slotImages[className];
  console.log('className:', className, 'imageName:', imageName);  // Add this line
  return <img src={`../src/tiles/${imageName}`} alt={className} />;
};

export default Slot;


