import { getDetailScore } from "../lib/getDetailScore";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)

  const userID = Number(query.userID)
  const songID = String(query.songID)

  const score = await getDetailScore(userID,songID)

  return score
})