import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTimes, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Anime } from "src/types";

@Component({
  selector: "app-suggest-frame",
  templateUrl: "./suggest-frame.component.html",
  styleUrls: ["./suggest-frame.component.css"],
})
export class SuggestFrameComponent implements OnInit {
  @Input() searchResponse!: Anime[];
  @Input() searchKeyword!: string;
  @Input() isVisibleSuggestFrame!: boolean;
  @Input() isSearchLoading!: boolean;
  @Input() isNotFound!: boolean;

  @Output() onCloseSuggestFrame = new EventEmitter();
  @Output() onSearchCardClick = new EventEmitter();

  CloseIcon: IconDefinition = faTimes;

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.onCloseSuggestFrame.emit();
  }
}
