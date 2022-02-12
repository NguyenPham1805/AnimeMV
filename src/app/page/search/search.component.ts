import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Observable, of, switchMap, tap } from "rxjs";
import { AppService } from "src/app/app.service";
import { Anime } from "src/types";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  providers: [AppService],
})
export class SearchComponent implements OnInit {
  searchIcon: IconDefinition = faSearch;
  searchResult: Anime[] = [];
  isLoading = true;
  searchKeyword = "";
  keyword = "";

  constructor(
    private animeService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refetch();
  }

  handleSubmited() {
    this.router.navigate(["/search"], {
      queryParams: { q: this.keyword },
    });
    this.refetch();
  }

  refetch() {
    this.isLoading = true;
    this.activatedRoute.queryParams
      .pipe(
        switchMap((query) => {
          if (query["q"]) {
            this.searchKeyword = query["q"];
            return this.animeService.getSearch({
              q: query["q"].toLocaleLowerCase(),
              page: 1,
              limit: 32,
            });
          }
          return of({ data: [] });
        }),
        tap(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        if (res.data) this.searchResult = res.data;
      });
  }
}
