import { Component, OnInit, HostListener } from "@angular/core";
import {
  faHistory,
  faCaretDown,
  IconDefinition,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import { Anime, ListSelectItem } from "src/types";
import { routes } from "src/routes";
import { Route } from "../../types";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [AppService],
})
export class HeaderComponent implements OnInit {
  CaretDownIcon: IconDefinition = faCaretDown;
  HistoryIcon: IconDefinition = faHistory;
  BookmarkIcon: IconDefinition = faBookmark;
  UserIcon: IconDefinition = faUser;
  BarsIcon: IconDefinition = faBars;

  navRoutes = routes.filter((route) => route.isHeader);

  searchKeyword: string = "";
  timeout: any = null;
  searchResponse: Anime[] = [];

  isHideNavbar: boolean = false;
  isMobileMenuOpen: boolean = false;
  isSearchLoading: boolean = false;
  isNotFound: boolean =
    this.searchResponse.length < 1 && this.searchKeyword.length > 0;
  isVisibleSuggestFrame: boolean = false;
  lastScrollTop: number = 0;

  listSelectIcon: ListSelectItem[] = [
    {
      icon: faHistory,
      link: "history",
    },
    {
      icon: faBookmark,
      link: "saved",
    },
    {
      icon: faUser,
      link: "login",
    },
  ];

  constructor(private http: AppService, private router: Router) {}

  ngOnInit(): void {}

  @HostListener("document: scroll")
  handleScroll() {
    if (window.pageYOffset >= 65) {
      let scrollTop = window.pageYOffset;
      this.isHideNavbar = scrollTop >= this.lastScrollTop;
      this.lastScrollTop = scrollTop;
    }
  }

  handleOpenMenuMobile() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.navRoutes.forEach((route) => {
      route.isOpen = false;
    });
  }

  handleCloseDropdown(dropdownRoute: Route) {
    this.navRoutes.forEach((route) => {
      if (dropdownRoute.name === route.name) {
        route.isOpen = !route.isOpen;
      }
    });
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
