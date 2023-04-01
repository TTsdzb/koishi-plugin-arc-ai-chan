import * as fs from "fs/promises";
import { z } from "zod";
import path from "path";

const musicDataSchema = z
  .object({
    title: z.string(),
    level: z.string().array(),
    basic_info: z.object({
      artist: z.string(),
    }),
  })
  .array();

export async function readMusicData() {
  return musicDataSchema.parse(
    JSON.parse(
      await fs.readFile(path.join(__dirname, "music_data.json"), {
        encoding: "utf-8",
      })
    )
  );
}
