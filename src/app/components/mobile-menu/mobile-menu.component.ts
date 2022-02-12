import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AppService } from "src/app/app.service";
import { Anime, ListSelectItem, Route } from "src/types";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  styleUrls: ["./mobile-menu.component.css"],
})
export class MobileMenuComponent implements OnInit {
  @Input() navRoutes!: Route[];
  @Input() listSelectIcon!: ListSelectItem[];
  @Input() isOpen!: boolean;

  timeout: any = null;
  searchResponse: Anime[] = [];
  searchKeyword: string = "";
  isSearchLoading: boolean = false;
  isNotFound: boolean =
    this.searchResponse.length < 1 && this.searchKeyword.length > 0;
  isVisibleSuggestFrame: boolean = false;

  CaretDownIcon: IconDefinition = faCaretDown;
  CloseIcon: IconDefinition = faTimes;

  @Output() onCloseDropdown = new EventEmitter<Route>();
  @Output() onClose = new EventEmitter();

  constructor(private http: AppService, private router: Router) {}

  ngOnInit(): void {}

  closeMenu(): void {
    this.onClose.emit();
  }

  HandleOpenDropdown(route: Route): void {
    this.onCloseDropdown.emit(route);
  }

  fetchSearch() {
    this.isSearchLoading = true;
    this.http
      .getSearch({
        q: this.searchKeyword.toLocaleLowerCase(),
        page: 1,
        limit: 16,
      })
      .subscribe((res) => {
        this.searchResponse = res.data;
        if (res.data.length < 1) this.isNotFound = true;
        else this.isNotFound = false;
        this.isSearchLoading = false;
      });
  }

  handleChageKeyword(keyword: string) {
    if (keyword.length > 0) {
      this.isVisibleSuggestFrame = true;
      this.isSearchLoading = true;
      this.searchKeyword = keyword;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.fetchSearch();
    }, 1000);
  }

  handleCloseSugetFrame() {
    this.searchKeyword = "";
    this.isVisibleSuggestFrame = false;
  }

  handleSubmited() {
    this.router.navigate(["/search"], {
      queryParams: { q: this.searchKeyword },
    });
    this.handleCloseSugetFrame();
  }
}
