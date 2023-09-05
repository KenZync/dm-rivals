import { getSongDetail } from "~/server/lib/getSongDetail";

export default defineEventHandler(async (event) => {
  const music_id = getRouterParam(event, "music_id");
  if(typeof music_id == "string"){
    const detail: DetailSongScore = await getSongDetail(parseInt(music_id, 10));
    const deathPoint: DeathPoint = {};
  
    detail.players.forEach((player) => {
      if (player.Clear === "Failed") {
        const key =
          player.Cool +
          player.Good +
          player.Bad +
          player.Miss;
        if(deathPoint[key]){
          deathPoint[key] = deathPoint[key] + "," + player.Name
        }else{
          deathPoint[key] = player.Name;
        }
      }
    });
    return deathPoint;
  }
});
