export const getRanking = async () => {
  const data = await $fetch(`https://dpjam.net/ranking`);
  return data;
};
