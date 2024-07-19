import React, { useState, useRef } from "react";
import Slot from "./Slot";
import Status from "./Status";
import Button from "./Button";
import Options from "./Options";
import "./SlotMachine.css";
import spinSound from "../sounds/spin.mp3";
import winSound from "../sounds/win.mp3";
import loseSound from "../sounds/lose.mp3";
import coinSound from "../sounds/coin.mp3";


// Image mapping
const slotImages = {
  a1: "../tiles/seven.png",
  a2: "../tiles/cherries.png",
  a3: "../tiles/club.png",
  a4: "../tiles/diamond.png",
  a5: "../tiles/heart.png",
  a6: "../tiles/spade.png",
  a7: "../tiles/joker.png",
};

const SlotMachine = () => {
  const [status, setStatus] = useState("WELCOME!");
  const [slots, setSlots] = useState(["a1", "a1", "a1"]);
  const [doing, setDoing] = useState(false);
//↑ doing controls for multiple spins ↑

  const spinAudio = useRef(null);
  const winAudio = useRef(null);
  const loseAudio = useRef(null);
  const coinAudio = useRef(null);

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const playSound = (audioRef) => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const doSlot = () => {
    if (doing) return;
    setDoing(true);
    setStatus("SPINNING");

    const numChanges = randomInt(1, 4) * 7;
    const numberSlot1 = numChanges + randomInt(1, 7);
    const numberSlot2 = numChanges + 2 * 7 + randomInt(1, 7);
    const numberSlot3 = numChanges + 4 * 7 + randomInt(1, 7);

    //controls the speed of the slot machine
    let i1 = 0,
      i2 = 0,
      i3 = 0;
    const interval = 50;

    //spin logic
    const spin = (slotIndex, numberSlot) => {
      const intervalId = setInterval(() => {
        if (slotIndex === 0) i1++;
        if (slotIndex === 1) i2++;
        if (slotIndex === 2) i3++;
        playSound(spinAudio);
        if (
          (slotIndex === 0 && i1 >= numberSlot) ||
          (slotIndex === 1 && i2 >= numberSlot) ||
          (slotIndex === 2 && i3 >= numberSlot)
        ) {
          clearInterval(intervalId);
          if (slotIndex === 2) testWin();
          playSound(coinAudio);
          return;
        }
        setSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          const className = `a${
            (parseInt(newSlots[slotIndex].substring(1)) % 7) + 1
          }`;
          newSlots[slotIndex] = className;
          return newSlots;
        });
      }, interval);
      return intervalId;
    };

    const slot1Id = spin(0, numberSlot1);
    const slot2Id = spin(1, numberSlot2);
    const slot3Id = spin(2, numberSlot3);
  };

  //wining conditions
  const testWin = () => {
    const [slot1, slot2, slot3] = slots;
    if (
      (slot1 === slot2 && slot2 === slot3) ||
      (slot1 === slot2 && slot3 === "a7") ||
      (slot1 === slot3 && slot2 === "a7") ||
      (slot2 === slot3 && slot1 === "a7") 
    ) 
    {
      setStatus("YOU WIN!");
      playSound(winAudio);
    } else {
      setStatus("YOU LOSE!");
      playSound(loseAudio);
    }
    setDoing(false);
    console.log(slot1)
    console.log(slot2)
    console.log(slot3)
  };

  return (
    <main>
      <Status text={status} />
      <section id="Slots">
        <Slot className={slots[0]} slotImages={slotImages} />
        <Slot className={slots[1]} slotImages={slotImages}/>
        <Slot className={slots[2]} slotImages={slotImages}/>
      </section>
      <Button onClick={doSlot} text="TAKE A SPIN!" />
      <Options />
      <audio ref={spinAudio} src={spinSound} />
      <audio ref={winAudio} src={winSound} />
      <audio ref={loseAudio} src={loseSound} />
      <audio ref={coinAudio} src={coinSound} />
    </main>
  );
};

export default SlotMachine;
