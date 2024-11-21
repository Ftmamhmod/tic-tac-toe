import React, { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, SetPlayerName] = useState(initialName);
  function handelEditClick() {
    setIsEditing((editing) => !editing);
    console.log("save");
  }
  function handelChange(event) {
    SetPlayerName(event.target.value);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  const playerNameEditable = <span className="player-name">{playerName}</span>;

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handelChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handelEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
