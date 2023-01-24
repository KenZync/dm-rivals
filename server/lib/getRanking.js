export const getRanking = async () => {
  const data = await $fetch(`https://dmjam.net/ranking`);
  return data;
};
