export const getSongLists = async () => {
  const data = await $fetch(`https://dpjam.net/music?keyword=&option=0&level-min=&level-max=`);
  return data;
};
