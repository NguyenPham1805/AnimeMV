import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Anime } from "src/types";

@Component({
  selector: "app-search-card",
  templateUrl: "./search-card.component.html",
  styleUrls: ["./search-card.component.css"],
})
export class SearchCardComponent implements OnInit {
  @Input() itemCard!: Anime;
  @Output() onSearchCardClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
