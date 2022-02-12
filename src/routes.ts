import { Genre, Ranking, Route } from "./types";
import { GENRES, RANKINGS, YEARS } from "./constant";
import { BrowserComponent } from "./app/page/browser/browser.component";
import { HomeComponent } from "./app/page/home/home.component";
import { InfoComponent } from "./app/page/info/info.component";
import { WatchComponent } from "./app/page/watch/watch.component";
import { SearchComponent } from "./app/page/search/search.component";
import { NotFoundComponent } from "./app/page/not-found/not-found.component";
import { MovieComponent } from "./app/page/movie/movie.component";
import { YearComponent } from "./app/page/year/year.component";
import { HistoryComponent } from "./app/page/history/history.component";

export const routes: Route[] = [
  {
    name: "Trang chủ",
    path: "",
    selector: HomeComponent,
    isHeader: true,
    isDropdown: false,
  },
  {
    name: "Phim lẻ",
    path: "movie",
    selector: MovieComponent,
    isHeader: true,
    isDropdown: false,
  },
  {
    name: "Thể loại",
    path: "genres/:slug",
    selector: BrowserComponent,
    isHeader: true,
    isDropdown: true,
    isOpen: false,
    dropdownData: GENRES,
    dropdownPath: (path: Genre) => `genres/${path.slug}`,
    listKey: (path: Genre) => path.name,
  },
  {
    name: "Top anime",
    path: "ranking/:slug",
    selector: BrowserComponent,
    isHeader: true,
    isDropdown: true,
    isOpen: false,
    dropdownData: RANKINGS,
    dropdownPath: (path: Ranking) => `ranking/${path.slug}`,
    listKey: (path: Ranking) => path.name,
  },
  {
    name: "Năm",
    path: "year/:year",
    selector: YearComponent,
    isHeader: true,
    isDropdown: true,
    isOpen: false,
    dropdownData: YEARS(),
    dropdownPath: (path: number) => `year/${path}`,
    listKey: (path: string) => path,
  },
  {
    name: "Thông tin phim",
    path: "info/:slug",
    selector: InfoComponent,
    isHeader: false,
  },
  {
    name: "Xem phim",
    path: "watch/:slug",
    selector: WatchComponent,
    isHeader: false,
  },
  {
    name: "Tìm kiếm",
    path: "search",
    selector: SearchComponent,
    isHeader: false,
  },
  {
    name: "Lịch sử",
    path: "history",
    selector: HistoryComponent,
    isHeader: false,
  },
  {
    name: "Not Found",
    path: "**",
    selector: NotFoundComponent,
    isHeader: false,
  },
];
