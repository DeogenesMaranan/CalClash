'use client';

import { useState } from 'react';

const generateRandom = (max: number) => Math.floor(Math.random() * max);

export default function CardComponent() {
  const cardInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/'];
  const maxCardArrLen = cardInput.length;
  const [deck, setDeck] = useState<string[]>([]);

  // move:
  const [currentExpression, setExpression] = useState<string[]>([]);
  // const [currentEvalulation, setCurrentEvalulation] = useState(0);
  const [usedCard, setUsedCard] = useState<number[]>([]);
  // temp log:
  const [message, setMessage] = useState('');

  const createDeck = () => {
    return new Array(42).fill('').map(() => cardInput[generateRandom(maxCardArrLen)]);
  };

  // move:
  const [gameState, setGameState] = useState('idle');
  const maxTarget = 50;
  const [target, setTarget] = useState<number>();
  const gameStart = () => {
    setTarget(Number(generateRandom(maxTarget)));
    setDeck(createDeck());
    setGameState('start');
  };

  const evalAnswer = () => {
    const result = evaluateExpression(currentExpression);
    if (target === result) setMessage('Equal');
    else setMessage('Not equal');

    setExpression([]);

    usedCard.forEach((cardIdx) => setDeck((prevDeck) => prevDeck.filter((_, i) => i !== cardIdx)));
  };

  // gpt:
  const evaluateExpression = (tokens: string[]) => {
    if (tokens.length === 0) return 0;

    let result = Number(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const num = Number(tokens[i + 1]);

      if (operator === '+') result += num;
      if (operator === '-') result -= num;
      if (operator === '*') result *= num;
      if (operator === '/') result /= num;
    }

    return result;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <p>
        target: {target} | eval result: {evaluateExpression(currentExpression)}
      </p>
      {gameState !== 'start' ? (
        <>
          <button className="borrder" onClick={gameStart}>
            test start
          </button>
        </>
      ) : (
        <>
          <button className="borrder" onClick={evalAnswer}>
            test eval
          </button>
        </>
      )}

      {currentExpression.join(' ')}
      {message}

      <div className="flex gap-4">
        {deck.slice(0, 7).map((card, idx) => (
          <button
            key={idx}
            className="h-15 w-10 border"
            onClick={() => {
              setExpression((prev) => [...prev, card]);
              setUsedCard((prev) => [...prev, idx]);
            }}
          >
            {card}
          </button>
        ))}
      </div>
    </div>
  );
}
