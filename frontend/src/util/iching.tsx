import ichingData from "../assets/iching/hexagrams.json";
import { formatTrigramLabel } from "./trigrams";
import {
  Hexagram,
  IchingReading,
  LineValue,
} from "../types/Iching";

const hexagrams = ichingData.hexagrams as Hexagram[];

const hexagramByBinary: Record<string, Hexagram> = Object.fromEntries(
  hexagrams.map((hexagram) => [hexagram.binary, hexagram])
);

/**
 * Whether a cast line is yang (solid).
 */
export const isYangLine = (line: LineValue): boolean =>
  line === 7 || line === 9;

/**
 * Whether a cast line is changing (old yin or old yang).
 */
export const isChangingLine = (line: LineValue): boolean =>
  line === 6 || line === 9;

/**
 * Flips a changing line to its resulting stable value.
 */
export const flipLine = (line: LineValue): LineValue => {
  if (line === 6) return 7;
  if (line === 9) return 8;
  return line;
};

/**
 * Converts six line values into a bottom-to-top binary string.
 */
export const linesToBinary = (lines: LineValue[]): string =>
  lines.map((line) => (isYangLine(line) ? "1" : "0")).join("");

/**
 * Looks up a hexagram by its bottom-to-top binary figure.
 */
export const getHexagramByBinary = (binary: string): Hexagram => {
  const hexagram = hexagramByBinary[binary];
  if (!hexagram) {
    throw new Error(`Unknown hexagram binary: ${binary}`);
  }
  return hexagram;
};

/**
 * Formats a hexagram's display name.
 */
export const formatHexagramName = (hexagram: Hexagram): string =>
  `${hexagram.number}. ${hexagram.unicode} ${hexagram.pinyin} / ${hexagram.leggeName} [${hexagram.title}]`;

const flipCoin = (): 2 | 3 => {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % 2 === 0 ? 3 : 2;
};

const castLine = (): LineValue => {
  const sum = flipCoin() + flipCoin() + flipCoin();
  return sum as LineValue;
};

/**
 * Casts six three-coin lines and resolves the primary and relating hexagrams.
 */
export const castIchingReading = (question: string): IchingReading => {
  const lines: LineValue[] = [
    castLine(),
    castLine(),
    castLine(),
    castLine(),
    castLine(),
    castLine(),
  ];

  const changingPositions = lines
    .map((line, index) => (isChangingLine(line) ? index + 1 : null))
    .filter((position): position is number => position !== null);

  const primary = getHexagramByBinary(linesToBinary(lines));
  const relating =
    changingPositions.length > 0
      ? getHexagramByBinary(linesToBinary(lines.map(flipLine)))
      : null;

  return {
    question: question.trim(),
    castAt: new Date().toISOString(),
    lines,
    primary,
    relating,
    changingPositions,
  };
};

const asciiBar = (line: LineValue): string => {
  const bar = isYangLine(line) ? "━━━━━━━" : "━━━   ━━━";
  return isChangingLine(line) ? `${bar} (changing)` : bar;
};

/**
 * Draws a hexagram as ASCII, line 6 at the top.
 */
export const formatHexagramAscii = (lines: LineValue[]): string =>
  [...lines].reverse().map(asciiBar).join("\n");

const formatSection = (title: string, body: string): string => {
  if (!body) return "";
  return `${title}\n${body}\n`;
};

const formatHexagramText = (
  heading: string,
  hexagram: Hexagram,
  lines: LineValue[] | null,
  includeChangingLines: boolean,
  changingPositions: number[]
): string => {
  const parts = [
    heading,
    formatHexagramName(hexagram),
    `Above: ${formatTrigramLabel(hexagram.above)}`,
    `Below: ${formatTrigramLabel(hexagram.below)}`,
    "",
  ];

  if (lines) {
    parts.push(formatHexagramAscii(lines), "");
  }

  parts.push(formatSection("Judgment", hexagram.judgment));
  parts.push(formatSection("Judgment commentary", hexagram.judgmentCommentary));
  parts.push(formatSection("Image", hexagram.image));
  parts.push(formatSection("Image commentary", hexagram.imageCommentary));

  if (includeChangingLines) {
    if (changingPositions.length === 0) {
      parts.push("No changing lines.\n");
    } else {
      parts.push("Changing lines:\n");
      changingPositions.forEach((position) => {
        const lineText = hexagram.lines[position - 1];
        parts.push(formatSection(`Line ${position}`, lineText.oracle));
        parts.push(formatSection(`Line ${position} commentary`, lineText.commentary));
      });

      if (
        changingPositions.length === 6 &&
        hexagram.allChanging
      ) {
        parts.push(formatSection("All lines changing", hexagram.allChanging.oracle));
        parts.push(
          formatSection(
            "All lines changing commentary",
            hexagram.allChanging.commentary
          )
        );
      }
    }
  }

  return parts.filter((part) => part !== "").join("\n");
};

/**
 * Builds the plain-text export of a completed reading.
 */
export const formatReadingExport = (reading: IchingReading): string => {
  const date = reading.castAt.slice(0, 10);
  const parts = [
    "I Ching Reading",
    `Date: ${date}`,
    reading.question ? `Question: ${reading.question}` : "Question: (none)",
    "",
    formatHexagramText(
      "Primary hexagram",
      reading.primary,
      reading.lines,
      true,
      reading.changingPositions
    ),
  ];

  if (reading.relating) {
    parts.push(
      "",
      formatHexagramText(
        "Relating hexagram",
        reading.relating,
        reading.lines.map(flipLine),
        false,
        []
      )
    );
  }

  parts.push("", ichingData.source);
  return `${parts.join("\n").trim()}\n`;
};

export const ichingSource = ichingData.source;
