import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Route {
  name: string;
  path: string;
  selector: any;
  isHeader: boolean;
  isDropdown?: boolean;
  isOpen?: boolean;
  dropdownData?: any[];
  dropdownPath?: (data: any) => string;
  listKey?: (data: any) => string;
}

export interface Episode {
  id: number;
  name: number;
  detail_name: string | null;
  full_name: string;
  film_name: string;
  slug: string;
  views: number;
  thumbnail_small: string;
  thumbnail_medium: string;
}

export interface Source extends Episode {
  videoSource: string;
}

export interface AnimeInfo {
  id: number;
  genres: Genre[];
  subTeams: string[];
  description: string;
  name: string;
  views: number;
  thumbnail: string;
  slug: string;
  episodes: Episode[];
}

export interface InfoResponse {
  success: boolean;
  data: AnimeInfo;
}

export interface Anime {
  id: number;
  slug: string;
  views: string;
  time: string | null;
  name: string;
  thumbnail: string;
  latestEpisode?: {
    name: string;
    views: string;
  };
  episodeIndex?: number;
}

export interface ListData {
  category: string;
  slug: string;
  page?: number;
  sort?: string;
}

export interface ListResponse {
  success: boolean;
  data: Anime[];
  pagination: {
    totalPage: number;
    currentPage: number;
  };
}

export interface StorageInfo {
  id: number;
  index: number;
  slug: string;
  title: string;
  thumbnail: string;
  currentTime: number;
  date: number;
  duration: number;
  views: number;
}

export interface SearchProps {
  q: string;
  limit: number;
  page: number;
}

export interface Genre {
  name: string;
  slug: string;
}

export interface Ranking {
  name: string;
  slug: string;
}

export interface Sort {
  name: string;
  slug: string;
}

export interface ListSelectItem {
  icon: IconDefinition;
  link: string;
}
