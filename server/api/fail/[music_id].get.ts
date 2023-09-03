import { getSongDetail } from "~/server/lib/getSongDetail";

export default defineEventHandler(async (event) => {
  const music_id = getRouterParam(event, "music_id");
  const detail: DetailSongScore = await getSongDetail(music_id);

  const deathPoint: DeathPoint = {};

  detail.players.forEach((player) => {
    if (player.Clear === "Failed") {
      const key =
        parseInt(player.Cool) +
        parseInt(player.Good) +
        parseInt(player.Bad) +
        parseInt(player.Miss);
      if(deathPoint[key]){
        deathPoint[key] = deathPoint[key] + "," + player.Name
      }else{
        deathPoint[key] = player.Name;
      }
    }
  });

  return deathPoint;
});
