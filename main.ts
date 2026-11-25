// Laugh Track: The Crypto Trading Joke Contest — one original crypto
// trading joke, written to /output/entry.txt.
//
// Why this line: the judge brief rewards a clear setup with a surprise
// turn, a detail that feels true to trading life, and the punchline last.
// The setup promises a strategy, the middle confesses the classic
// buy-high-sell-low blunder every trader recognises, and the payoff lands
// on the group chat — the place where every bad trade is retroactively
// rebranded as a plan. Tight, repeatable, no throat clearing.
//
// The joke is fixed text, so the program is fully deterministic: every run
// produces byte-identical output, and the gate below proves the text fits
// the bounty rules (1-200 characters, not whitespace-only) before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My trading strategy is simple: buy the top, panic-sell the bottom, then tell my group chat it was a long-term plan all along.";

// Fail loudly if the entry text breaks the bounty gate. Length is measured
// in Unicode code points via Array.from, so a character like the em dash
// counts once even though it takes three bytes in UTF-8. The entry must also
// be a single line: the bounty asks for one line, so any newline in the text
// is a bug, not a feature.
function validateEntry(text: string): number {
  const codePoints = Array.from(text);
  const count = codePoints.length;
  const hasVisibleText = codePoints.some((ch) => ch.trim() !== "");
  if (count === 0 || count > 200) {
    throw new Error(
      `entry must be 1-200 characters long, but it is ${count}`,
    );
  }
  if (!hasVisibleText) {
    throw new Error("entry must contain more than whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return count;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateEntry(JOKE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
