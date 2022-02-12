import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faEllipsisV, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { StorageInfo } from "src/types";

@Component({
  selector: "app-history-item",
  templateUrl: "./history-item.component.html",
  styleUrls: ["./history-item.component.css"],
})
export class HistoryItemComponent implements OnInit {
  optionIcon: IconDefinition = faEllipsisV;

  @Input() anime!: StorageInfo;

  @Output() onRemoveHistoryItem = new EventEmitter<object>();

  isOptionDropdown = false;

  constructor() {}

  ngOnInit(): void {}
}
