import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBell, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { map, switchMap, tap, zip } from "rxjs";
import { AppService } from "src/app/app.service";
import { chunk } from "src/app/utils";
import { AnimeInfo, Episode } from "src/types";

@Component({
  selector: "app-watch",
  templateUrl: "./watch.component.html",
  styleUrls: ["./watch.component.css"],
  providers: [AppService],
})
export class WatchComponent implements OnInit {
  likeIcon: IconDefinition = faHeart;
  saveIcon: IconDefinition = faPlus;
  followIcon: IconDefinition = faBell;

  chunk = chunk;
  episodeChunks!: Episode[][];

  info!: AnimeInfo;
  isLoading: boolean = false;
  slug!: string;
  source!: string;
  poster!: string;
  title!: string;
  views!: number;
  index!: number;

  constructor(
    private readonly animeService: AppService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchSource();
  }

  fetchSource(index?: number) {
    zip(
      this.activatedRoute.params.pipe(
        tap(() => (this.isLoading = true)),
        switchMap((param) => {
          this.slug = param["slug"];
          return this.animeService.getInfo(param["slug"]);
        }),
        tap((info) => {
          this.info = info.data;
          this.episodeChunks = this.chunk<Episode>(info.data.episodes, 30);
        })
      ),
      this.activatedRoute.queryParams.pipe(
        map((query) => query["episode_index"])
      )
    )
      .pipe(
        switchMap((x) => {
          this.index = index ? index - 1 : Number(x[1]) - 1;
          return this.animeService.getSource(x[0].data.id, this.index);
        }),
        tap(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        this.source = res.data.videoSource;
        this.title = res.data.film_name + " : " + res.data.full_name;
        this.poster = res.data.thumbnail_medium;
        this.views = res.data.views;
        document.title = "AnimeMV | Xem phim - " + this.title;
      });
  }
}
