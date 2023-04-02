import * as fs from "fs/promises";
import { z } from "zod";
import path from "path";

const songListSchema = z.object({
  songs: z
    .object({
      title_localized: z.record(z.string()),
      artist: z.string(),
    })
    .array(),
});

export async function readSongList() {
  return songListSchema.parse(
    JSON.parse(
      await fs.readFile(path.join(__dirname, "songlist.json"), {
        encoding: "utf-8",
      })
    )
  ).songs;
}
