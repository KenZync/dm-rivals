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
    const data = await getCompare(score1,score2, id1, id2)
    return data
  }else if(id1 && !query.user2){
    return {win1:score1, id1}
  }else if(id2 && !query.user1){
    return {win2:score2, id2}
  }else if(!id1 && query.user1){
    throw createError({ statusCode: 404, statusMessage: 'User 1 Not Found. Please Type Correctly' })
  }else if(!id2 && query.user2){
    throw createError({ statusCode: 404, statusMessage: 'User 2 Not Found. Please Type Correctly' })
  }else{
      throw createError({ statusCode: 404, statusMessage: 'Both Users Not Found. Please Type Correctly' })
  }
})