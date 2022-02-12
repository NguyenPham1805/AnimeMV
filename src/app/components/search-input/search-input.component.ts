import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faSearch, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"],
})
export class SearchInputComponent implements OnInit {
  faSearch: IconDefinition = faSearch;
  @Input() keyword!: string;
  @Output() onKeyWordChage = new EventEmitter<string>();
  @Output() onSumited = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  search() {
    this.onKeyWordChage.emit(this.keyword);
  }
}
