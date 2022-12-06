import { getCompare } from "../lib/getCompare"
import { getID } from "../lib/getID";
import { getRanking } from "../lib/getRanking";
import { getScore } from "../lib/getScore";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)
  const ranking = await getRanking();
  const id1 = getID(ranking,query.user1)
  const id2 = getID(ranking,query.user2)

  let score1;
  let score2;

  if(id1){
    score1 = await getScore(id1)
  }

  if(id2){
    score2 = await getScore(id2)
  }

  if(id1 && id2){
    const data = await getCompare(score1,score2)
    return data
  }else if(id1){
    return {win1:score1}
  }else if(id2){
    return {win2:score2}
  }else{
      throw createError({ statusCode: 404, statusMessage: 'Eror No ID Found' })
  }
})