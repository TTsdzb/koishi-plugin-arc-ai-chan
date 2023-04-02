import { Context, Schema } from "koishi";
import { readMusicData } from "./music";
import { readAf } from "./af";

export const name = "arc-ai-chan";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export async function apply(ctx: Context) {
  const regExp = /AI酱.*(推荐|挑|随|换).*一首.*(曲子|歌)/i;
  const musicData = await readMusicData();
  const af = (await readAf())["zh-Hans"];

  ctx.middleware((session, next) => {
    if (session.content.length > 50)
      // 可能是发电，快跑
      return next();
    if (!regExp.test(session.content)) return next();

    // 随机一段话
    let text = af[Math.floor(Math.random() * af.length)];
    // 随机一首歌
    const music = musicData[Math.floor(Math.random() * musicData.length)];

    text = text.replace(/歌曲名称/g, `${music.title}`);
    text = text.replace(/“作曲家”/g, `“${music.basic_info.artist}”`);

    return text;
  });
}
