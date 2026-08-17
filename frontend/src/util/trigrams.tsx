import { TrigramId } from "../types/Iching";

export type Trigram = {
  id: TrigramId;
  pinyin: string;
  leggeName: string;
  english: string;
};

/**
 * The eight trigrams, keyed for lookup from hexagram JSON.
 */
export const trigrams: Record<TrigramId, Trigram> = {
  qian: {
    id: "qian",
    pinyin: "Qián",
    leggeName: "Khien",
    english: "Heaven",
  },
  kun: {
    id: "kun",
    pinyin: "Kūn",
    leggeName: "Khwan",
    english: "Earth",
  },
  zhen: {
    id: "zhen",
    pinyin: "Zhèn",
    leggeName: "Kan",
    english: "Thunder",
  },
  kan: {
    id: "kan",
    pinyin: "Kǎn",
    leggeName: "Khan",
    english: "Water",
  },
  gen: {
    id: "gen",
    pinyin: "Gèn",
    leggeName: "Kan",
    english: "Mountain",
  },
  xun: {
    id: "xun",
    pinyin: "Xùn",
    leggeName: "Sun",
    english: "Wind",
  },
  li: {
    id: "li",
    pinyin: "Lí",
    leggeName: "Lî",
    english: "Fire",
  },
  dui: {
    id: "dui",
    pinyin: "Duì",
    leggeName: "Tui",
    english: "Lake",
  },
};

/**
 * Formats a trigram for display, e.g. "Lí / Fire".
 */
export const formatTrigramLabel = (trigramId: TrigramId): string => {
  const trigram = trigrams[trigramId];
  return `${trigram.pinyin} / ${trigram.english}`;
};
