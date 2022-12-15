import { getDetailScore } from "../lib/getDetailScore";
import { test } from "../lib/test";

export default defineEventHandler(async (event) =>{
  const score = await test()

  return score
})