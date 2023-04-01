import * as fs from "fs/promises";
import { z } from "zod";
import path from "path";

const afSchema = z.record(z.string().array());

export async function readAf() {
  return afSchema.parse(
    JSON.parse(
      await fs.readFile(path.join(__dirname, "af2023.json"), {
        encoding: "utf-8",
      })
    )
  );
}
