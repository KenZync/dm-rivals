import { getRanking } from "../lib/getRanking";
export default defineEventHandler(async (event) => {
  await getRanking();
  return ""
});
