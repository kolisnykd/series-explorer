export interface TVmazeShow {
  id: number;
  name: string;
  status: string;
  premiered: string | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  summary: string | null;
  image: {
    medium: string;
    original: string;
  } | null;
  network?: {
    name: string;
  } | null;
  webChannel?: {
    name: string;
  } | null;
  averageRuntime?: number | null;
  runtime?: number | null;
  ended?: string | null;
  url: string;
}

export interface TVmazeImage {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface TVmazeSeason {
  id: number;
  number: number | null;
  episodeOrder: number | null;
  premiereDate: string | null;
  endDate: string | null;
}

export interface TVmazeEpisode {
  id: number;
  name: string;
  season: number;
  number: number | null;
  airdate: string | null;
}

export interface TVmazePerson {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
}

export interface TVmazeCharacter {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
}

export interface TVmazeCastMember {
  person: TVmazePerson;
  character: TVmazeCharacter;
}

export interface TVmazeCrewMember {
  type: string;
  person: TVmazePerson;
}
