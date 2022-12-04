import { getCompare } from "../lib/getCompare"
import { getID } from "../lib/getID";
import { getRanking } from "../lib/getRanking";
import { getScore } from "../lib/getScore";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)
  const ranking = await getRanking();
  const id1 = getID(ranking,query.user1)
  const id2 = getID(ranking,query.user2)
  if(!id1 || !id2){
    throw createError({ statusCode: 404, statusMessage: 'Eror No ID Found' })
  }
  const score1 = await getScore(id1)
  const score2 = await getScore(id2)
  const data = await getCompare(score1,score2)
  return data
})