import { Context, Schema } from "koishi";
import * as fs from "fs/promises";
import { z } from "zod";
import path from "path";

export const name = "arc-ai-chan";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

const afSchema = z.record(z.string().array());
const songListSchema = z.object({
  songs: z
    .object({
      title_localized: z.record(z.string()),
      artist: z.string(),
    })
    .array(),
});

async function readAf() {
  return afSchema.parse(
    JSON.parse(
      await fs.readFile(path.join(__dirname, "af2023.json"), {
        encoding: "utf-8",
      })
    )
  );
}

async function readSongList() {
  return songListSchema.parse(
    JSON.parse(
      await fs.readFile(path.join(__dirname, "songlist.json"), {
        encoding: "utf-8",
      })
    )
  ).songs;
}

export async function apply(ctx: Context) {
  const regExp = /AI酱.*(推荐|挑|随|换).*一首.*(曲子|歌)/i;
  const songList = await readSongList();
  const af = (await readAf())["zh-Hans"];

  ctx.middleware((session, next) => {
    if (session.content.length > 50)
      // 可能是发电，快跑
      return next();
    if (!regExp.test(session.content)) return next();

    // 随机一段话
    let text = af[Math.floor(Math.random() * af.length)];
    // 随机一首歌
    const song = songList[Math.floor(Math.random() * songList.length)];

    text = text.replace(/歌曲名称/g, `${song.title_localized["en"]}`);
    text = text.replace(/“作曲家”/g, `“${song.artist}”`);

    return text;
  });
}
