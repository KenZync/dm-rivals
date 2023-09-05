import { getCompare } from "../lib/getCompare";
import { getPlayerLists } from "../lib/getPlayerLists";
import { getScore } from "../lib/getScore";
import { getSongLists } from "../lib/getSongLists";

export default defineEventHandler(async (event) => {
  const query: { user1: string; user2: string; allSongs: boolean } =
    getQuery(event);

  const players = await getPlayerLists();

  let id1;
  let id2;

  if (query.user1) {
    id1 = players.find(
      (player) => player.Nickname.toLowerCase() === query.user1.toLowerCase()
    )?.ID;
  }

  if (query.user2) {
    id2 = players.find(
      (player) => player.Nickname.toLowerCase() === query.user2.toLowerCase()
    )?.ID;
  }

  if (!id1 && !id2) {
    throw createError({
      statusCode: 404,
      statusMessage: "Both Users Not Found. Please Type Correctly",
    });
  }

  if (id2 && !id1 && query.user1) {
    throw createError({
      statusCode: 404,
      statusMessage: "User 1 Not Found. Please Type Correctly",
    });
  }

  if (id1 && !id2 && query.user2) {
    throw createError({
      statusCode: 404,
      statusMessage: "User 2 Not Found. Please Type Correctly",
    });
  }

  let score1;
  let score2;
  let songLists;

  const promises = [];

  if (id1) {
    promises.push(getScore(id1).then(result => {
      score1 = result;
    }));
  }
  
  if (id2) {
    promises.push(getScore(id2).then(result => {
      score2 = result;
    }));
  }
  
  if (JSON.parse(query.allSongs?.toString() || "false")) {
    promises.push(getSongLists().then(result => {
      songLists = result;
    }));
  }
  
  await Promise.all(promises);

  const data = await getCompare(score1, score2, id1, id2, songLists);
  return data;
});
