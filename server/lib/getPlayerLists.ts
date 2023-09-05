import { PlayerLists } from "~/types/dmjam";
import { Tier } from "~/types/enum";

export const getPlayerLists = async () => {
  const data: PlayerLists = await $fetch(`https://dmjam.net/api/players`);

  const players: {
    ID: number;
    Nickname: string;
    Tier: Tier;
    Clear: number;
  }[] = [];

  data.player_infos.forEach((player) => {
    if (player.player_nickname == null) return;
    players.push({
      ID: player.player_code,
      Nickname: player.player_nickname,
      Tier: player.tier,
      Clear: player.rank,
    });
  });
  return players;
};
