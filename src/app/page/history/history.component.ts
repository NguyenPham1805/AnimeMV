import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Storage from "src/app/utils/Storage";
import { StorageInfo } from "src/types";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  Storage = Storage;
  trashIcon: IconDefinition = faTrash;
  searchIcon: IconDefinition = faSearch;

  keyword = "";

  listRecently!: StorageInfo[];
  animeList!: StorageInfo[];

  isOptionDropdown = false;

  constructor() {}

  ngOnInit(): void {
    this.updateListRecent();
    document.title = "AnimeMV | lịch sử";
  }

  handleSubmited() {
    this.animeList = this.listRecently.filter((item) => {
      return item.title
        .toLocaleLowerCase()
        .includes(this.keyword.toLocaleLowerCase());
    });
  }

  handleClearStorageInfo() {
    Storage.clearItem("AnimeMV-recent");
    this.updateListRecent();
  }

  handleRemoveHistoryItem(filter: object) {
    Storage.remove("AnimeMV-recent", filter);
    this.updateListRecent();
  }

  updateListRecent() {
    this.listRecently = Storage.find<StorageInfo>("AnimeMV-recent").sort(
      (a, b) => b.date - a.date
    );
  }
}
