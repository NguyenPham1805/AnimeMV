import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { map, switchMap } from "rxjs/operators";
import {
  faBell,
  faEye,
  faHeart,
  faPlayCircle,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faEllipsisV,
  faExclamation,
  faListUl,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import { AppService } from "src/app/app.service";
import { chunk } from "src/app/utils";
import { Episode, Genre } from "src/types";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"],
  providers: [AppService],
})
export class InfoComponent implements OnInit {
  playIcon: IconDefinition = faPlayCircle;
  likeIcon: IconDefinition = faHeart;
  rateIcon: IconDefinition = faStar;
  viewIcon: IconDefinition = faEye;
  followIcon: IconDefinition = faBell;
  epIcon: IconDefinition = faListUl;
  optionIcon: IconDefinition = faEllipsisV;
  saveIcon: IconDefinition = faBookmark;
  reportIcon: IconDefinition = faExclamation;
  suportIcon: IconDefinition = faPlusCircle;

  chunk = chunk;

  genres!: Genre[];
  title!: string;
  views!: number;
  slug!: string;
  countEp!: number;
  subteams!: string[];
  description!: string;
  bannerImage!: string;
  isLoading: boolean = false;
  isOptionDropdown: boolean = false;

  episodeChunks!: Episode[][];

  constructor(
    private http: AppService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        map((params) => {
          this.slug = params["slug"];
          return params["slug"];
        }),
        switchMap((slug) => this.http.getInfo(slug))
      )
      .subscribe((res) => {
        this.genres = res.data.genres;
        this.subteams = res.data.subTeams;
        this.title = res.data.name;
        this.bannerImage =
          res.data.episodes[0]?.thumbnail_small || res.data.thumbnail;
        this.episodeChunks = this.chunk<Episode>(res.data.episodes, 30);
        this.views = res.data.views;
        this.countEp = res.data.episodes.length;
        this.description = res.data.description;
        this.isLoading = false;
        document.title = "AnimeMV | Thông tin - " + this.title;
      });
  }

  handleOptionDropdown() {
    this.isOptionDropdown = !this.isOptionDropdown;
  }
}
