// Weirdest Job Title: Blind Judge Showdown
// Writes one original job title to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when the harness sets it).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE =
  "Senior Vice President of Apologizing to Printers";

function checkTitle(title: string): void {
  // Gate: /output/entry.txt must be UTF-8 text of 1 to 60 characters,
  // not only white space, and a single line.
  const length = [...title].length;
  if (length < 1 || length > 60) {
    throw new Error(`job title must be 1-60 characters, got ${length}`);
  }
  if (title.trim().length === 0) {
    throw new Error("job title must not be only white space");
  }
  if (/[\r\n]/.test(title)) {
    throw new Error("job title must be a single line");
  }
}

function resolveOutDir(): string {
  // The harness sets $MAKEFUN_OUTPUT_DIR; fall back to /output when run
  // locally. Resolved in one place so the write path never hardcodes it.
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(outDir: string, title: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), title, "utf8");
}

function main(): void {
  checkTitle(TITLE);
  writeEntry(resolveOutDir(), TITLE);
}

main();
