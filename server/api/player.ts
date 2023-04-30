import { getCompare } from "../lib/getCompare"
import { getPlayerData } from "../lib/getPlayer";
import { getRanking } from "../lib/getRanking";
import { getScore } from "../lib/getScore";
import { getSongLists } from "../lib/getSongLists";

export default defineEventHandler(async (event) =>{
  const query = getQuery(event)
  const ranking = await getRanking();
  const data = getPlayerData(ranking,query.user)
  return data;
})