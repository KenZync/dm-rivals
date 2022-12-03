import { getScore } from "~~/server/lib/getScore";

export default defineEventHandler(async (event) => {
    const id = await getScore(event.context.params.username)
  return id
});
