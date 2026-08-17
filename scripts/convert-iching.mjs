/**
 * Fetches James Legge's public-domain I Ching text (one page per hexagram)
 * and writes frontend/src/assets/iching/hexagrams.json.
 *
 * Source pages: https://baharna.com/iching/legge/{binary}.htm
 * Only Legge / Ten Wings text is kept; modern translator blocks are dropped.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(
  SCRIPT_DIR,
  "../frontend/src/assets/iching/hexagrams.json"
);
const BASE_URL = "https://baharna.com/iching/legge";

const PINYIN_BY_NUMBER = {
  1: "Qián",
  2: "Kūn",
  3: "Zhūn",
  4: "Méng",
  5: "Xū",
  6: "Sòng",
  7: "Shī",
  8: "Bǐ",
  9: "Xiǎo Xù",
  10: "Lǚ",
  11: "Tài",
  12: "Pǐ",
  13: "Tóng Rén",
  14: "Dà Yǒu",
  15: "Qiān",
  16: "Yù",
  17: "Suí",
  18: "Gǔ",
  19: "Lín",
  20: "Guān",
  21: "Shì Kè",
  22: "Bì",
  23: "Bō",
  24: "Fù",
  25: "Wú Wàng",
  26: "Dà Xù",
  27: "Yí",
  28: "Dà Guò",
  29: "Kǎn",
  30: "Lí",
  31: "Xián",
  32: "Héng",
  33: "Dùn",
  34: "Dà Zhuàng",
  35: "Jìn",
  36: "Míng Yí",
  37: "Jiā Rén",
  38: "Kuí",
  39: "Jiǎn",
  40: "Xiè",
  41: "Sǔn",
  42: "Yì",
  43: "Guài",
  44: "Gòu",
  45: "Cuì",
  46: "Shēng",
  47: "Kùn",
  48: "Jǐng",
  49: "Gé",
  50: "Dǐng",
  51: "Zhèn",
  52: "Gèn",
  53: "Jiàn",
  54: "Guī Mèi",
  55: "Fēng",
  56: "Lǚ",
  57: "Xùn",
  58: "Duì",
  59: "Huàn",
  60: "Jié",
  61: "Zhōng Fú",
  62: "Xiǎo Guò",
  63: "Jì Jì",
  64: "Wèi Jì",
};

const TRIGRAM_BY_BITS = {
  "111": "qian",
  "110": "dui",
  "101": "li",
  "100": "zhen",
  "011": "xun",
  "010": "kan",
  "001": "gen",
  "000": "kun",
};

const SKIP_STARTS = [
  "[whincup]",
  "[christensen]",
  "[pearson]",
  "[redmond]",
  "changing to",
  "matching line in adjacent hexagram",
];

const ENTITY_MAP = {
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  hellip: "…",
  copy: "©",
};

const decodeEntities = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(Number.parseInt(dec, 10))
    )
    .replace(/&([a-z]+);/gi, (match, name) => ENTITY_MAP[name.toLowerCase()] ?? match);

const stripTags = (innerHtml) =>
  decodeEntities(
    innerHtml
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const headingText = (innerHtml) => stripTags(innerHtml).replace(/\s+/g, " ");

const shouldSkip = (text) => {
  const lower = text.toLowerCase();
  return SKIP_STARTS.some((prefix) => lower.startsWith(prefix));
};

const extractBlocks = (html) => {
  const blocks = [];
  const pattern = /<(h3|h4|p)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    blocks.push({
      tag: match[1].toLowerCase(),
      attrs: match[2] ?? "",
      inner: match[3],
      text: stripTags(match[3]),
    });
  }
  return blocks;
};

const parseTitle = (text) => {
  const match = text.match(/^(\d+)\.\s+(.+?)\s*\[(.+)\]\s*$/);
  if (!match) {
    throw new Error(`Could not parse hexagram title: ${text}`);
  }
  return {
    number: Number(match[1]),
    leggeName: match[2].trim(),
    title: match[3].trim(),
  };
};

const joinParagraphs = (paragraphs) => paragraphs.filter(Boolean).join("\n\n");

const splitLineStatements = (paragraphs) => {
  const lines = [];
  let allChangingParagraphs = [];
  let current = null;

  const startLine = (position, firstParagraph) => {
    if (current) lines.push(current);
    current = { position, paragraphs: [firstParagraph] };
  };

  for (const paragraph of paragraphs) {
    const numbered = paragraph.match(/^[A-Za-z]*(\d+)\s*\.\s+([\s\S]*)$/);
    if (numbered) {
      const position = Number(numbered[1]);
      if (position >= 1 && position <= 7) {
        if (position === 7) {
          if (current) {
            lines.push(current);
            current = null;
          }
          allChangingParagraphs = [numbered[2].trim(), ...allChangingParagraphs];
          continue;
        }
        startLine(position, numbered[2].trim());
        continue;
      }
    }
    if (allChangingParagraphs.length && !current) {
      allChangingParagraphs.push(paragraph);
      continue;
    }
    if (current) current.paragraphs.push(paragraph);
  }
  if (current) lines.push(current);

  const toLine = (entry) => ({
    position: entry.position,
    oracle: entry.paragraphs[0] ?? "",
    commentary: joinParagraphs(entry.paragraphs.slice(1)),
  });

  return {
    lines: lines.map(toLine),
    allChanging:
      allChangingParagraphs.length === 0
        ? undefined
        : {
            oracle: allChangingParagraphs[0],
            commentary: joinParagraphs(allChangingParagraphs.slice(1)),
          },
  };
};

const parseHexagramPage = (html, binary) => {
  const start = html.search(/<h3>/i);
  if (start < 0) {
    throw new Error(`Could not find hexagram title for ${binary}`);
  }
  const remaining = html.slice(start);
  const endOffset = remaining.search(/<h4[^>]*align="right"/i);
  if (endOffset < 0) {
    throw new Error(`Could not find hexagram content end for ${binary}`);
  }
  const blocks = extractBlocks(remaining.slice(0, endOffset));
  const titleBlock = blocks.find((block) => block.tag === "h3");
  if (!titleBlock) throw new Error(`Missing title for ${binary}`);

  const { number, leggeName, title } = parseTitle(titleBlock.text);
  const sections = [];
  let current = { name: "preamble", paragraphs: [] };

  for (const block of blocks) {
    if (block.tag === "h3") continue;
    if (block.tag === "h4") {
      sections.push(current);
      current = { name: headingText(block.inner), paragraphs: [] };
      continue;
    }
    if (!block.text || shouldSkip(block.text)) continue;
    current.paragraphs.push(block.text);
  }
  sections.push(current);

  const byName = (needle) =>
    sections.find((section) =>
      section.name.toLowerCase().includes(needle.toLowerCase())
    );

  const thwan = byName("Thwan")?.paragraphs ?? [];
  const commentsOnThwan = byName("Comments on the Thwan")?.paragraphs ?? [];
  const sentences = byName("Explanation of the Sentences")?.paragraphs ?? [];
  const symbolism = byName("Great Symbolism")?.paragraphs ?? [];
  const lineSection =
    sections.find((section) =>
      /line statements/i.test(section.name)
    )?.paragraphs ??
    sections.find((section) => /^lines$/i.test(section.name.trim()))
      ?.paragraphs ??
    [];

  const judgment = thwan[0] ?? "";
  const judgmentCommentary = joinParagraphs([
    ...thwan.slice(1),
    ...commentsOnThwan,
    ...sentences,
  ]);
  const image = symbolism[0] ?? "";
  const imageCommentary = joinParagraphs(symbolism.slice(1));
  const { lines, allChanging } = splitLineStatements(lineSection);

  if (lines.length !== 6) {
    throw new Error(
      `Hexagram ${number} (${binary}) has ${lines.length} lines, expected 6`
    );
  }

  const belowBits = binary.slice(0, 3);
  const aboveBits = binary.slice(3);

  return {
    number,
    unicode: String.fromCodePoint(0x4dc0 + number - 1),
    pinyin: PINYIN_BY_NUMBER[number],
    leggeName,
    title,
    binary,
    above: TRIGRAM_BY_BITS[aboveBits],
    below: TRIGRAM_BY_BITS[belowBits],
    judgment,
    judgmentCommentary,
    image,
    imageCommentary,
    lines,
    ...(allChanging ? { allChanging } : {}),
  };
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPage = async (binary) => {
  const url = `${BASE_URL}/${binary}.htm`;
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${url} -> ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      await sleep(400 * 2 ** (attempt - 1));
    }
  }
  throw lastError;
};

const allBinaries = () => {
  const binaries = [];
  for (let value = 0; value < 64; value += 1) {
    binaries.push(value.toString(2).padStart(6, "0"));
  }
  return binaries;
};

const main = async () => {
  const hexagrams = [];
  for (const binary of allBinaries()) {
    process.stdout.write(`Fetching ${binary}.htm...\n`);
    const html = await fetchPage(binary);
    hexagrams.push(parseHexagramPage(html, binary));
    await sleep(80);
  }

  hexagrams.sort((a, b) => a.number - b.number);
  const numbers = hexagrams.map((hexagram) => hexagram.number);
  if (numbers.join(",") !== Array.from({ length: 64 }, (_, i) => i + 1).join(",")) {
    throw new Error(`Unexpected hexagram numbers: ${numbers.join(",")}`);
  }

  const payload = {
    source:
      "James Legge, The Sacred Books of the East, Vol. 16 (1882). Public domain.",
    hexagrams,
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  process.stdout.write(`Wrote ${OUT_PATH}\n`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
