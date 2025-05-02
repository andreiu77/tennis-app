import React, { useState } from "react";
import "./add-player-form.css";
import toast from "react-hot-toast";
import { on } from "events";

interface AddPlayerFormProps {
  onClose: () => void;
  onAddPlayer: (player: {
    id: number;
    name: string;
    country: string;
    racket_brand: string;
    date_of_birth: string;
    ranking: number;
    number_of_titles: number;
    handedness: string;
    imageUrl: string;
  }) => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onClose, onAddPlayer }) => {
  const [newPlayer, setNewPlayer] = useState({
    id: 0,
    name: "",
    country: "",
    racket_brand: "",
    date_of_birth: "",
    ranking: 0,
    number_of_titles: 0,
    handedness: "right_handed",
    imageUrl: null,
  });

  const isFormValid = () => {
    return (
      newPlayer.name.trim() !== "" &&
      newPlayer.country.trim() !== "" &&
      newPlayer.racket_brand.trim() !== "" &&
      newPlayer.date_of_birth !== "" &&
      newPlayer.ranking > 0 &&
      newPlayer.number_of_titles >= 0 &&
      ["left_handed", "right_handed"].includes(newPlayer.handedness)
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Please fill out all required fields correctly.");
      return;
    }
    try {
      onAddPlayer(newPlayer);
      onClose();
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Error adding player. Check console for details.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="image-upload">
          <div className="image-placeholder">
            <i className="bi bi-image"></i>
          </div>
        </div>
        <div className="handedness">
          <label>
            <input
              type="radio"
              name="handedness"
              value="right_handed"
              checked={newPlayer.handedness === "right_handed"}
              onChange={() => setNewPlayer({ ...newPlayer, handedness: "right_handed" })}
            />
            Right-handed
          </label>
          <label>
            <input
              type="radio"
              name="handedness"
              value="left_handed"
              checked={newPlayer.handedness === "left_handed"}
              onChange={() => setNewPlayer({ ...newPlayer, handedness: "left_handed" })}
            />
            Left-handed
          </label>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" placeholder="Enter name..." value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" placeholder="Enter country..." value={newPlayer.country} onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Racket brand:</label>
          <input type="text" placeholder="Enter racket brand..." value={newPlayer.racket_brand} onChange={(e) => setNewPlayer({ ...newPlayer, racket_brand: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Birth date:</label>
          <div className="input-icon">
            <i className="bi bi-calendar"></i>
            <input type="date" value={newPlayer.date_of_birth} onChange={(e) => setNewPlayer({ ...newPlayer, date_of_birth: e.target.value })} />
          </div>
        </div>

        <div className="form-group">
          <label>Ranking:</label>
          <div className="input-icon">
            <i className="bi bi-hash"></i>
            <input type="number" placeholder="Current rank..." value={newPlayer.ranking} onChange={(e) => setNewPlayer({ ...newPlayer, ranking: Number(e.target.value) })} />
          </div>
        </div>
        <div className="form-group">
          <label>Titles:</label>
          <div className="input-icon">
            <i className="bi bi-trophy-fill"></i>
            <input type="number" placeholder="# of titles..." value={newPlayer.number_of_titles} onChange={(e) => setNewPlayer({ ...newPlayer, number_of_titles: Number(e.target.value) })} />
          </div>
        </div>
        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerForm;

