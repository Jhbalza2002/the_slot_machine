import React, { useState } from 'react';
import './Options.css';

const Options = () => {
  const [audio, setAudio] = useState(false);

  const toggleAudio = () => {
    setAudio(prevAudio => !prevAudio);
  };

  return (
    <section id="options">
      <img
        src={`../src/icons/audio${audio ? 'On' : 'Off'}.png`}
        id="audio"
        className="option"
        onClick={toggleAudio}
        alt="Audio Toggle"
      />
    </section>
  );
};

export default Options;
