import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  listPage: number[] = [];
  leftIcon: IconDefinition = faChevronLeft;
  rightIcon: IconDefinition = faChevronRight;

  @Output() onchagePage = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    let listPage: number[] = [];
    let beforePage = this.currentPage - 1;
    let affter = this.currentPage + 1;
    for (let i = beforePage; i <= affter; i++) {
      if (i > this.totalPages) continue;
      if (i === 0) i = 1;
      listPage.push(i);
    }
    this.listPage = listPage;
  }

  chagePage(page: number) {
    this.currentPage = page;
    this.ngOnInit();
    this.onchagePage.emit(page);
  }
}
