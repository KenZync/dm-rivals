import { getDetailScore } from "../lib/getDetailScore";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)

  const userID = query.userID
  const songID = query.songID

  const score = await getDetailScore(userID,songID)

  return score
})