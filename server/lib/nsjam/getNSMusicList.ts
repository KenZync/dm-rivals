import type { PlayerScoreProfile } from "~/types/dmjam";
import type { NSMusic, NSPlayerScore } from "~/types/nsjam";

export const getNSMusicList = async (player: string) => {
  const runtimeConfig = useRuntimeConfig();
  const data: NSMusic[] = await $fetch(
    `${runtimeConfig.nsjamApiBase}/api/music/`
  );

  return data;
};
