import { getAllPlayers } from "./data";


export function validatePlayerData(body: any, playerIdToIgnore?: number) {
    if (body.name && (typeof body.name !== "string" || body.name.length < 2)) {
      return "Name must be at least 2 characters long";
    }
    if (body.country && typeof body.country !== "string") {
      return "Country must be a string";
    }
    if (body.date_of_birth && isNaN(Date.parse(body.date_of_birth))) {
      return "Invalid date format";
    }
    if (body.ranking && (typeof body.ranking !== "number" || body.ranking <= 0 || getAllPlayers().some(player =>
      player.ranking === body.ranking && player.id !== playerIdToIgnore))) {
      return "Ranking must be a positive number and unique";
    }
    if (body.number_of_titles && (typeof body.number_of_titles !== "number" || body.number_of_titles < 0)) {
      return "Number of titles must be a non-negative number";
    }
    if (body.handedness && !["left-handed", "right-handed"].includes(body.handedness)) {
      return "Handedness must be 'left-handed' or 'right-handed'";
    }
    if (body.imageUrl && typeof body.imageUrl !== "string") {
      return "Image URL must be a string";
    }
    return null;
  }