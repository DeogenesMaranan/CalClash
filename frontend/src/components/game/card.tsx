'use client';

import { useState } from 'react';

const generateRandom = (max: number) => Math.floor(Math.random() * max);

export default function CardComponent() {
  const cardInput = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/'];
  const maxCardArrLen = cardInput.length;
  const [deck, setDeck] = useState<(string | number)[]>([]);

  const createDeck = () => {
    return new Array(42).fill('').map(() => cardInput[generateRandom(maxCardArrLen)]);
  };

  // move:
  const maxTarget = 50;
  const [target, setTarget] = useState<number>();
  const gameStart = () => {
    setTarget(Number(generateRandom(maxTarget)));
    setDeck(createDeck());
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      {target}
      <button className="borrder" onClick={gameStart}>
        test start
      </button>

      <div className="flex gap-4">
        {deck.slice(0, 7).map((card, idx) => (
          <button key={idx}>{card}</button>
        ))}
      </div>
    </div>
  );
}
