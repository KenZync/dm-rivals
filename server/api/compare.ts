import { getCompare } from "../lib/getCompare"
import { getID } from "../lib/getID";
import { getRanking } from "../lib/getRanking";
import { getScore } from "../lib/getScore";
import { getSongLists } from "../lib/getSongLists";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)
  const ranking = await getRanking();
  const id1 = getID(ranking,query.user1)
  const id2 = getID(ranking,query.user2)

  let score1;
  let score2;

  let songLists;

  if(id1){
    score1 = await getScore(id1)
  }

  if(id2){
    score2 = await getScore(id2)
  }

  if(JSON.parse(query.allSongs?.toString() || 'false')){
    songLists = await getSongLists();
  }

  if (id1 || id2) {
    const data = await getCompare(score1, score2, id1, id2, songLists);
    return data;
  } else if (query.user1) {
    throw createError({ statusCode: 404, statusMessage: 'User 1 Not Found. Please Type Correctly' });
  } else if (query.user2) {
    throw createError({ statusCode: 404, statusMessage: 'User 2 Not Found. Please Type Correctly' });
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Both Users Not Found. Please Type Correctly' });
  }
})