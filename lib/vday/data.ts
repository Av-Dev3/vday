import lyricsData from "@/data/vday/lyrics.json";
import poemsData from "@/data/vday/poems.json";
import notesData from "@/data/vday/notes.json";
import cluesData from "@/data/vday/clues.json";

export interface Lyric {
  t: number;
  line: string;
}

export interface Clue {
  id: string;
  word?: string;
  type: "tear" | "pocket" | "flip";
  content: string;
}

export const getLyrics = (): Lyric[] => {
  return lyricsData as Lyric[];
};

export const getPoems = (): string[] => {
  return poemsData as string[];
};

export const getNotes = (): string[] => {
  return notesData as string[];
};

export const getClues = (): Clue[] => {
  return cluesData as Clue[];
};
