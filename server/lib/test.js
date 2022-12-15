import * as fs from "fs";
// import Struct from "struct";
import _ from "struct-fu";
import iconv from "iconv-lite";

export const test = async () => {
  var data = fs.readFileSync("data/o2ma1339.ojn");

  const headerStruct = _.struct([
    _.int32le("songid"),
    _.char("signature", 4),
    _.float32le("encode_version"),
    _.int32le("genre"),
    _.float32le("bpm"),
    _.struct("level", [
      _.int16le("EX"),
      _.int16le("NX"),
      _.int16le("HX"),
      _.int16le("Unknown"),
    ]),
    _.struct("event_count", [
      _.int32le("EX"),
      _.int32le("NX"),
      _.int32le("HX"),
    ]),
    _.struct("note_count", [_.int32le("EX"), _.int32le("NX"), _.int32le("HX")]),
    _.struct("measure_count", [
      _.int32le("EX"),
      _.int32le("NX"),
      _.int32le("HX"),
    ]),
    _.struct("package_count", [
      _.int32le("EX"),
      _.int32le("NX"),
      _.int32le("HX"),
    ]),
    _.int16le("old_encode_version"),
    _.int16le("old_songid"),
    _.char("old_genre", 20),
    _.int32le("bmp_size"),
    _.int32le("old_file_version"),
    _.byte("title", 64),
    _.byte("artist", 32),
    _.byte("noter", 32),
    _.char("ojm_file", 32),
    _.int32le("cover_size"),
    _.struct("time", [_.int32le("EX"), _.int32le("NX"), _.int32le("HX")]),
    _.struct("note_offset", [
      _.int32le("EX"),
      _.int32le("NX"),
      _.int32le("HX"),
    ]),
    _.int32le("cover_offset"),
  ]);

  const output = headerStruct.unpack(data);
  output.title = iconv.decode(output.title, "CP949").replace(/\0/g, "");
  output.artist = iconv.decode(output.artist, "CP949").replace(/\0/g, "");
  output.noter = iconv.decode(output.noter, "CP949").replace(/\0/g, "");

  const cover_offset_end = output.cover_offset+output.cover_size
  const bmp_offset_end = cover_offset_end + output.bmp_size
  const cover = data.slice(output.cover_offset,cover_offset_end)
  const bmp = data.slice(cover_offset_end,bmp_offset_end)
  // const base64 = cover.toString('base64')
  const base64 = bmp.toString('base64')

  


  return {output,base64};

  // const songid = data.readInt32LE(0);
  // const signature = data.slice(4, 8).toString();
  // const encode_version = data.readFloatLE(8);
  // const genre = data.readInt32LE(12);
  // const bpm = data.readFloatLE(16);

  // const level = [
  //   data.readInt16LE(20),
  //   data.readInt16LE(22),
  //   data.readInt16LE(24),
  // ];

  // const event_count = [
  //   data.readInt32LE(28),
  //   data.readInt32LE(32),
  //   data.readInt32LE(36),
  // ];

  // const note_count = [
  //   data.readInt32LE(40),
  //   data.readInt32LE(44),
  //   data.readInt32LE(48),
  // ];

  // const measure_count = [
  //   data.readInt32LE(52),
  //   data.readInt32LE(56),
  //   data.readInt32LE(60),
  // ];

  // const package_count = [
  //   data.readInt32LE(64),
  //   data.readInt32LE(68),
  //   data.readInt32LE(72),
  // ];

  // const old_encode_version = data.readInt16LE(76);
  // const old_songid = data.readInt16LE(78);
  // const old_genre = data.slice(80, 100).toString();
  // const bmp_size = data.readInt32LE(100);
  // const old_file_version = data.readInt32LE(104);
  // const title = iconv.decode(data.slice(108, 172), "CP949").replace(/\0/g, "");
  // const artist = iconv.decode(data.slice(172, 204), "CP949").replace(/\0/g, "");
  // const noter = iconv.decode(data.slice(204, 236), "CP949").replace(/\0/g, "");
  // const ojm_file = data.slice(236, 268).toString();
  // const cover_size = data.readInt32LE(268);

  // const time = [
  //   data.readInt32LE(272),
  //   data.readInt32LE(276),
  //   data.readInt32LE(280),

  // ];

  // const note_offset = [
  //   data.readInt32LE(284),
  //   data.readInt32LE(288),
  //   data.readInt32LE(292),
  // ];

  // const cover_offset = data.readInt32LE(296);

  // data = {
  //   songid,
  //   signature,
  //   encode_version,
  //   genre,
  //   bpm,
  //   level,
  //   event_count,
  //   note_count,
  //   measure_count,
  //   package_count,
  //   old_encode_version,
  //   old_songid,
  //   old_genre,
  //   bmp_size,
  //   old_file_version,
  //   title,
  //   artist,
  //   noter,
  //   ojm_file,
  //   cover_size,
  //   time,
  //   note_offset,
  //   cover_offset
  // };

  // return { output, songid, data };
};
