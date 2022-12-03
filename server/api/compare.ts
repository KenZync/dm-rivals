import { getCompare } from "../lib/getCompare"

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)
  const data = await getCompare(query.user1,query.user2)
  return data
})