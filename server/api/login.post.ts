// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);

//   // event._requestBody
//   // const music_id = getRouterParam(event, "music_id");
// //   const url = `https://dmjam.net/troubleshoot/gem-to-cash`;
//   // const data = await $fetch(url);

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//   var urlencoded = new URLSearchParams();
//   urlencoded.append("o2jam-id", body.username);
//   urlencoded.append("o2jam-pw", body.password);
//   urlencoded.append("gem-amount", "0");

// //   var requestOptions = {
// //     method: "POST",
// //     headers: myHeaders,
// //     body: urlencoded,
// //     redirect: "follow",
// //   };

//   const data = $fetch("https://dmjam.net/troubleshoot/gem-to-cash", {method:"POST",headers:myHeaders,body:urlencoded})
//     // .then((response) => response.text())
//     // .then((result) => console.log(result))
//     // .catch((error) => console.log("error", error));

//   return data;
// });
