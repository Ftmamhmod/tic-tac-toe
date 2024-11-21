import React from "react";

const initialTest = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const Test = () => {
  return (
    <ol id="game-board">
      {initialTest.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button>{col}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};
