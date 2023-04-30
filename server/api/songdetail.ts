import { getSongDetail } from "../lib/getSongDetail";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)
  const music = query.music
  console.log(music)
  const detail = await getSongDetail(music)
  return detail
})