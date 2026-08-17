export type TrigramId =
  | "qian"
  | "kun"
  | "zhen"
  | "kan"
  | "gen"
  | "xun"
  | "li"
  | "dui";

export type LineValue = 6 | 7 | 8 | 9;

export type HexagramLineText = {
  position: number;
  oracle: string;
  commentary: string;
};

export type Hexagram = {
  number: number;
  unicode: string;
  pinyin: string;
  leggeName: string;
  title: string;
  binary: string;
  above: TrigramId;
  below: TrigramId;
  judgment: string;
  judgmentCommentary: string;
  image: string;
  imageCommentary: string;
  lines: HexagramLineText[];
  allChanging?: {
    oracle: string;
    commentary: string;
  };
};

export type IchingReading = {
  question: string;
  castAt: string;
  lines: LineValue[];
  primary: Hexagram;
  relating: Hexagram | null;
  changingPositions: number[];
};
