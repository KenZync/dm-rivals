import { getScore } from "~~/server/lib/getScore";

export default defineEventHandler(async (event) => {
    const id = await getScore(decodeURIComponent(event.context.params.username))
  return id
});
