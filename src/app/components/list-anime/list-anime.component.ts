import { Component, OnInit, Input } from "@angular/core";
import { Anime } from "src/types";

@Component({
  selector: "app-list-anime",
  templateUrl: "./list-anime.component.html",
  styleUrls: ["./list-anime.component.css"],
})
export class ListAnimeComponent implements OnInit {
  @Input() listAnime!: Anime[];
  @Input() isListAnimeLoading!: boolean;

  skeletonGrid = new Array(32).fill(null);

  constructor() {}

  ngOnInit(): void {}
}
