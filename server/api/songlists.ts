import { getSongLists } from "../lib/getSongLists";

export default defineEventHandler(async (event) =>{
const songLists = await getSongLists();
return songLists
})