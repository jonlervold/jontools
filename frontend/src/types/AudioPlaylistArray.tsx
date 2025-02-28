type AudioPlaylistItem = {
  grouping?: string;
  currentlyPlayingTitle: string;
  playlistTitle: string;
  src: string;
};

export type AudioPlaylistArray = AudioPlaylistItem[];
